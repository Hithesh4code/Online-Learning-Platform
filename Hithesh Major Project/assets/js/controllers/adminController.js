import { getAllCourses, upsertCourse } from "../models/courseModel.js";
import { isLoggedIn } from "../models/authModel.js";

const form = document.getElementById("admin-form");
const messageEl = document.getElementById("admin-message");
const listEl = document.getElementById("admin-courses");

function renderCatalog(courses) {
  listEl.innerHTML = courses
    .map(
      (course) => `
      <article class="dashboard-item">
        <h4>${course.title}</h4>
        <p class="meta">${course.id} | ${course.level} | ${course.duration}</p>
        <p>${course.description}</p>
      </article>
    `
    )
    .join("");
}

async function refreshCatalog() {
  const courses = await getAllCourses();
  renderCatalog(courses);
}

if (!isLoggedIn()) {
  messageEl.textContent = "Please login first to access admin features.";
  form?.classList.add("hidden");
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.getElementById("admin-id").value.trim();
  const title = document.getElementById("admin-title").value.trim();
  const description = document.getElementById("admin-description").value.trim();
  const duration = document.getElementById("admin-duration").value.trim();
  const level = document.getElementById("admin-level").value;
  const videoEmbedUrl = document.getElementById("admin-video").value.trim();
  const notesInput = document.getElementById("admin-notes").value.trim();
  const lessonsInput = document.getElementById("admin-lessons").value.trim();

  const notes = notesInput
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const lessonLines = lessonsInput
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const lessons = lessonLines.length
    ? lessonLines.map((line, index) => {
        const [lessonTitle, lessonVideo] = line.split("|");
        return {
          id: `l${index + 1}`,
          title: (lessonTitle || `Lesson ${index + 1}`).trim(),
          videoEmbedUrl: (lessonVideo || videoEmbedUrl).trim()
        };
      })
    : [{ id: "l1", title: "Introduction", videoEmbedUrl }];

  await upsertCourse({
    id,
    title,
    description,
    duration,
    level,
    featured: false,
    videoUrl: videoEmbedUrl,
    notes,
    lessons
  });

  messageEl.textContent = "Course saved successfully.";
  form.reset();
  refreshCatalog();
});

refreshCatalog();
