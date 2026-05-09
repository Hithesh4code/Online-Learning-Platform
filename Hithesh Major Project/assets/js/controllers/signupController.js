import { signUp } from "../models/authModel.js";

const form = document.getElementById("signup-form");
const messageEl = document.getElementById("signup-message");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  const result = signUp(name, email, password);
  if (!result.ok) {
    messageEl.textContent = result.message;
    return;
  }

  messageEl.textContent = "Account created. Redirecting...";
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
});
