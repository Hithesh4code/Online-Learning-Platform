import { getAllCourses } from "../models/courseModel.js";
import { getEnrolledCourseIds } from "../models/storageModel.js";
import { renderCourseCards } from "../views/courseViews.js";

async function initHome() {
  const container = document.getElementById("featured-courses");
  const courses = await getAllCourses();
  const featured = courses.filter((course) => course.featured).slice(0, 3);
  renderCourseCards(container, featured, getEnrolledCourseIds());
}

initHome();
