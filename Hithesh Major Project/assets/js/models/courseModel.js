const COURSE_KEY = "learnhub_courses";
let courseCache = [];

function toEmbedUrl(url = "") {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function normalizeCourse(course) {
  const normalizedVideo = toEmbedUrl(course.videoUrl);
  return {
    ...course,
    videoUrl: normalizedVideo,
    notes: Array.isArray(course.notes) ? course.notes : [],
    lessons: (course.lessons || []).map((lesson) => ({
      ...lesson,
      videoEmbedUrl: toEmbedUrl(lesson.videoEmbedUrl || normalizedVideo)
    }))
  };
}

export async function getAllCourses() {
  if (courseCache.length) {
    return courseCache;
  }

  const savedCourses = localStorage.getItem(COURSE_KEY);
  if (savedCourses) {
    courseCache = JSON.parse(savedCourses).map(normalizeCourse);
    localStorage.setItem(COURSE_KEY, JSON.stringify(courseCache));
    return courseCache;
  }

  const response = await fetch("assets/data/courses.json");
  courseCache = (await response.json()).map(normalizeCourse);
  localStorage.setItem(COURSE_KEY, JSON.stringify(courseCache));
  return courseCache;
}

export async function getCourseById(courseId) {
  const courses = await getAllCourses();
  return courses.find((course) => course.id === courseId) || null;
}

export async function saveCourseCatalog(courses) {
  courseCache = courses;
  localStorage.setItem(COURSE_KEY, JSON.stringify(courses));
}

export async function upsertCourse(courseInput) {
  const courses = await getAllCourses();
  const nextCourse = normalizeCourse(courseInput);
  const index = courses.findIndex((course) => course.id === nextCourse.id);
  if (index >= 0) {
    courses[index] = nextCourse;
  } else {
    courses.push(nextCourse);
  }
  await saveCourseCatalog(courses);
}
