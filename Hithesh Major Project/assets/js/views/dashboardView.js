import { calculateProgress } from "../utils/helpers.js";

export function renderDashboard(container, courses, progressByCourse, studentName) {
  container.innerHTML = courses
    .map((course) => {
      const progress = calculateProgress(course, progressByCourse[course.id]);
      const certificateLink =
        progress === 100
          ? `<a class="btn secondary tiny" href="certificate.html?student=${encodeURIComponent(studentName)}&course=${encodeURIComponent(course.title)}" target="_blank">Get Certificate</a>`
          : "";
      return `
      <article class="dashboard-item">
        <h4>${course.title}</h4>
        <p class="meta">${course.duration} | ${course.level}</p>
        <p>Progress: ${progress}%</p>
        <div class="progress-bar"><span style="width:${progress}%"></span></div>
        <p><a href="course-detail.html?id=${course.id}">Continue Course</a></p>
        ${certificateLink}
      </article>
    `;
    })
    .join("");
}
