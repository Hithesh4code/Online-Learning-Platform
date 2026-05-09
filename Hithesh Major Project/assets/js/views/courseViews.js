import { calculateProgress } from "../utils/helpers.js";

export function renderCourseCards(container, courses, enrolledIds = []) {
  container.innerHTML = courses
    .map(
      (course) => `
    <article class="course-card">
      <h4>${course.title}</h4>
      <p>${course.description}</p>
      <p class="meta">${course.level} | ${course.duration}</p>
      <div>
        <a class="btn secondary" href="course-detail.html?id=${course.id}">View Details</a>
        ${enrolledIds.includes(course.id) ? '<span class="meta"> Enrolled</span>' : ""}
      </div>
    </article>
  `
    )
    .join("");
}

export function renderCourseDetail(container, course, isEnrolled, progressMap) {
  const progress = calculateProgress(course, progressMap);
  container.innerHTML = `
    <article class="detail-card">
      <h2>${course.title}</h2>
      <p>${course.description}</p>
      <p class="meta">${course.level} | ${course.duration}</p>
      <button id="enroll-btn" class="btn" ${isEnrolled ? "disabled" : ""}>
        ${isEnrolled ? "Already Enrolled" : "Enroll in Course"}
      </button>
      <div class="progress-wrap">
        <p class="meta">Progress: <strong id="progress-value">${progress}%</strong></p>
        <div class="progress-bar"><span id="progress-fill" style="width:${progress}%"></span></div>
      </div>
    </article>
  `;
}

export function renderLearningResources(container, course) {
  const notes = course.notes || [];
  container.innerHTML = `
    <article class="resource-card">
      <h3>Learning Resources</h3>
      <p class="meta">Read the notes, then use the video for extra explanation.</p>
      ${
        course.videoUrl
          ? `<p><a class="btn secondary" href="${course.videoUrl}" target="_blank" rel="noopener noreferrer">Watch YouTube Lesson</a></p>`
          : ""
      }
      <ul class="notes-list">
        ${notes.map((note) => `<li>${note}</li>`).join("")}
      </ul>
    </article>
  `;
}

export function renderVideoPlayer(container, course, lessonId) {
  const activeLesson = course.lessons.find((lesson) => lesson.id === lessonId) || course.lessons[0];
  const embedUrl = activeLesson?.videoEmbedUrl || course.videoUrl || "";
  if (!embedUrl) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <article class="resource-card">
      <h3>Lesson Video</h3>
      <p class="meta">${activeLesson?.title || "Video lesson"}</p>
      <div class="video-frame-wrap">
        <iframe
          class="video-frame"
          src="${embedUrl}"
          title="Lesson video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </article>
  `;
}

export function renderLessons(container, course, progressMap) {
  container.innerHTML = course.lessons
    .map(
      (lesson) => `
    <label class="lesson-item">
      <span>${lesson.title}</span>
      <input data-lesson-id="${lesson.id}" type="checkbox" ${progressMap?.[lesson.id] ? "checked" : ""} />
    </label>
  `
    )
    .join("");
}
