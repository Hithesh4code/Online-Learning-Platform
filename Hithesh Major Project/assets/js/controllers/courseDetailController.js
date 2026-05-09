import { getCourseById } from "../models/courseModel.js";
import {
  enrollCourse,
  getCourseProgress,
  isCourseEnrolled,
  toggleLessonCompletion
} from "../models/storageModel.js";
import { getCurrentUser } from "../models/authModel.js";
import { getQueryParam, calculateProgress } from "../utils/helpers.js";
import { renderCourseDetail, renderLearningResources, renderLessons, renderVideoPlayer } from "../views/courseViews.js";

const detailEl = document.getElementById("course-detail");
const resourcesEl = document.getElementById("learning-resources");
const videoEl = document.getElementById("video-player");
const lessonsEl = document.getElementById("lessons-list");

function bindLessonEvents(course) {
  lessonsEl.querySelectorAll(".lesson-item").forEach((lessonRow) => {
    lessonRow.addEventListener("click", () => {
      const lessonId = lessonRow.querySelector('input[type="checkbox"]').dataset.lessonId;
      renderVideoPlayer(videoEl, course, lessonId);
    });
  });

  lessonsEl.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      if (!getCurrentUser()) {
        window.location.href = "login.html";
        return;
      }
      toggleLessonCompletion(course.id, event.target.dataset.lessonId);
      const progress = calculateProgress(course, getCourseProgress(course.id));
      document.getElementById("progress-value").textContent = `${progress}%`;
      document.getElementById("progress-fill").style.width = `${progress}%`;
    });
  });
}

async function initCourseDetail() {
  const courseId = getQueryParam("id");
  const course = await getCourseById(courseId);

  if (!course) {
    detailEl.innerHTML = '<p class="empty-state">Course not found.</p>';
    lessonsEl.innerHTML = "";
    return;
  }

  renderCourseDetail(detailEl, course, isCourseEnrolled(course.id), getCourseProgress(course.id));
  renderLearningResources(resourcesEl, course);
  renderLessons(lessonsEl, course, getCourseProgress(course.id));
  renderVideoPlayer(videoEl, course, course.lessons[0]?.id);

  const enrollBtn = document.getElementById("enroll-btn");
  enrollBtn?.addEventListener("click", () => {
    if (!getCurrentUser()) {
      window.location.href = "login.html";
      return;
    }
    enrollCourse(course.id);
    enrollBtn.disabled = true;
    enrollBtn.textContent = "Already Enrolled";
  });

  bindLessonEvents(course);
}

initCourseDetail();
