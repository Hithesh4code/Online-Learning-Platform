import { getAllCourses } from "../models/courseModel.js";
import { getEnrolledCourseIds, getProgressMap } from "../models/storageModel.js";
import { getCurrentUser } from "../models/authModel.js";
import { renderDashboard } from "../views/dashboardView.js";

const dashboardEl = document.getElementById("dashboard-courses");
const emptyEl = document.getElementById("dashboard-empty");

async function initDashboard() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const courses = await getAllCourses();
  const enrolledIds = getEnrolledCourseIds();
  const enrolledCourses = courses.filter((course) => enrolledIds.includes(course.id));

  if (!enrolledCourses.length) {
    emptyEl.classList.remove("hidden");
    dashboardEl.innerHTML = "";
    return;
  }

  emptyEl.classList.add("hidden");
  renderDashboard(dashboardEl, enrolledCourses, getProgressMap(), user.name);
}

initDashboard();
