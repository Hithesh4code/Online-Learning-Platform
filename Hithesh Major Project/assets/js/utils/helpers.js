export function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function calculateProgress(course, completionMap) {
  const lessons = course.lessons || [];
  if (!lessons.length) return 0;
  const completed = lessons.filter((lesson) => completionMap?.[lesson.id]).length;
  return Math.round((completed / lessons.length) * 100);
}
