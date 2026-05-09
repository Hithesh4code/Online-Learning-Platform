import { getQueryParam } from "../utils/helpers.js";

const container = document.getElementById("certificate-card");
const student = getQueryParam("student") || "Student";
const course = getQueryParam("course") || "Course";
const date = new Date().toLocaleDateString();

container.innerHTML = `
  <h1>Certificate of Completion</h1>
  <p>This is to certify that</p>
  <h2>${student}</h2>
  <p>has successfully completed</p>
  <h3>${course}</h3>
  <p>Date: ${date}</p>
  <button class="btn" onclick="window.print()">Download / Print</button>
`;
