import { getCurrentUser, logout } from "../models/authModel.js";

function renderAuthSlot() {
  const slot = document.getElementById("auth-slot");
  if (!slot) return;

  const user = getCurrentUser();
  if (!user) {
    slot.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
      <a href="admin.html">Admin</a>
    `;
    return;
  }

  slot.innerHTML = `
    <a href="admin.html">Admin</a>
  `;

  const existingGreeting = document.getElementById("user-greeting");
  if (!existingGreeting) {
    const mainContainer = document.querySelector("main.container");
    if (mainContainer) {
      const greeting = document.createElement("p");
      greeting.id = "user-greeting";
      greeting.className = "user-greeting";
      greeting.textContent = `Hi, ${user.name}`;
      mainContainer.prepend(greeting);
    }
  }

  const existingLogout = document.getElementById("floating-logout-btn");
  if (!existingLogout) {
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "floating-logout-btn";
    logoutBtn.className = "btn floating-logout-btn";
    logoutBtn.textContent = "Logout";
    document.body.appendChild(logoutBtn);
  }

  document.getElementById("floating-logout-btn")?.addEventListener("click", () => {
    logout();
    window.location.href = "index.html";
  });
}

renderAuthSlot();
