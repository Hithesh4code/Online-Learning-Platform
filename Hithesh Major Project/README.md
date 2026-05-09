# LearnHub - Online Learning Platform

A college-level mini project built with plain HTML, CSS, and JavaScript using an MVC-style frontend structure.

## Features
- Homepage with featured courses
- Course listing page with search and level filter
- Course detail page with enroll button and lessons
- My Courses dashboard with progress bars
- Lesson completion simulation using checkboxes
- localStorage persistence for enrollment and progress
- Responsive layout for desktop and mobile
- Mock login/signup authentication (localStorage)
- Admin panel to add/edit courses (localStorage catalog)
- Embedded YouTube video player for lessons
- Certificate generation page for 100% completed courses

## Project Structure
- `assets/js/models`: data + storage logic
- `assets/js/views`: UI rendering functions
- `assets/js/controllers`: page behavior and event flow
- `assets/data/courses.json`: static mock course data

## Run Locally
Open a local server from the project root:

```bash
python -m http.server 5500
```

Then open [http://localhost:5500](http://localhost:5500) in your browser.

## Notes
- No database or external API is used.
- This project uses mock authentication and browser storage only.
