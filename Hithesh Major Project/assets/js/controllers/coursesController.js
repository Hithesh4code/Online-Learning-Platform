import { getAllCourses } from "../models/courseModel.js";
import { getEnrolledCourseIds } from "../models/storageModel.js";
import { renderCourseCards } from "../views/courseViews.js";

const listEl = document.getElementById("courses-list");
const emptyStateEl = document.getElementById("empty-state");
const searchEl = document.getElementById("search-input");
const levelEl = document.getElementById("level-filter");

let allCourses = [];

function draw() {
  const term = searchEl.value.trim().toLowerCase();
  const level = levelEl.value;

  const filtered = allCourses.filter((course) => {
    const matchText = course.title.toLowerCase().includes(term);
    const matchLevel = level === "all" || course.level === level;
    return matchText && matchLevel;
  });

  renderCourseCards(listEl, filtered, getEnrolledCourseIds());
  emptyStateEl.classList.toggle("hidden", filtered.length > 0);
}

async function initCourses() {
  allCourses = await getAllCourses();
  draw();
  searchEl.addEventListener("input", draw);
  levelEl.addEventListener("change", draw);
}

initCourses();
