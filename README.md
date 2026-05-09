# Online-Learning-Platform
A college-level Online Learning Platform built with plain HTML, CSS, and JavaScript using an MVC-style frontend structure.
Overview
LearnHub allows students to:

 Sign up and log in (mock authentication)
 Browse and search courses
 Enroll in courses
 Watch lesson videos and read notes
 Mark lessons complete and track progress
 Generate a certificate after completing a course
 It also includes a simple Admin page to add/edit courses.

This is a frontend-only demo project. No real backend/database is used.

Features
Authentication gate (login required before app pages)
Home page with featured courses
Courses page with search + level filter
Course detail page with:
enrollment
lesson checklist
embedded YouTube lesson player
learning notes/resources
My Courses dashboard with progress bars
Certificate generation (print/download) at 100% completion
Admin panel to add/update courses
Responsive UI (mobile + desktop)
Browser persistence using localStorage
Tech Stack
HTML5
CSS3
Vanilla JavaScript (ES Modules)
localStorage for persistence
Static JSON as initial course seed data
Project Structure
.
├── index.html
├── login.html
├── signup.html
├── courses.html
├── course-detail.html
├── dashboard.html
├── admin.html
├── certificate.html
├── README.md
├── README-COMPLETE.md
└── assets
    ├── css
    │   └── styles.css
    ├── data
    │   └── courses.json
    └── js
        ├── utils
        │   └── helpers.js
        ├── models
        │   ├── authModel.js
        │   ├── courseModel.js
        │   └── storageModel.js
        ├── views
        │   ├── courseViews.js
        │   └── dashboardView.js
        └── controllers
            ├── authGuard.js
            ├── layoutController.js
            ├── homeController.js
            ├── coursesController.js
            ├── courseDetailController.js
            ├── dashboardController.js
            ├── loginController.js
            ├── signupController.js
            ├── adminController.js
            └── certificateController.js
Getting Started
1) Clone / open project
cd C:\Users\TECQNIO\Documents\hemanth-project
2) Run a local server
python -m http.server 5500
3) Open in browser
http://localhost:5500/login.html
(If you open root URL, auth guard will redirect unauthenticated users to login.)

How Authentication Works
Users are stored in localStorage (learnhub_users)
Active session is stored in learnhub_current_user
authGuard.js protects non-public pages
Logout clears current session
Local Storage Keys
learnhub_users
learnhub_current_user
learnhub_courses
learnhub_enrolled
learnhub_progress
Admin Usage
Login first
Open admin.html
Add/update course fields
Submit to save into localStorage catalog
Certificate Flow
A Get Certificate button appears in the dashboard when a course reaches 100% progress. Clicking it opens certificate.html with student and course details and a print option.

Important Notes
This project is intended for academic/demo use.
Passwords are stored in plain text in browser storage (not production-safe).
To reset demo state, clear localStorage in browser DevTools.
Extended Documentation
For very detailed documentation (including deep file explanations), see:
