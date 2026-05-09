const ENROLLED_KEY = "learnhub_enrolled";
const PROGRESS_KEY = "learnhub_progress";

export function getEnrolledCourseIds() {
  const raw = localStorage.getItem(ENROLLED_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function enrollCourse(courseId) {
  const enrolled = getEnrolledCourseIds();
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem(ENROLLED_KEY, JSON.stringify(enrolled));
  }
}

export function isCourseEnrolled(courseId) {
  return getEnrolledCourseIds().includes(courseId);
}

export function getProgressMap() {
  const raw = localStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function getCourseProgress(courseId) {
  return getProgressMap()[courseId] || {};
}

export function toggleLessonCompletion(courseId, lessonId) {
  const progress = getProgressMap();
  progress[courseId] = progress[courseId] || {};
  progress[courseId][lessonId] = !progress[courseId][lessonId];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
