import { login } from "../models/authModel.js";

const form = document.getElementById("login-form");
const messageEl = document.getElementById("login-message");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const result = login(email, password);

  if (!result.ok) {
    messageEl.textContent = result.message;
    return;
  }

  messageEl.textContent = "Login successful. Redirecting...";
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
});
