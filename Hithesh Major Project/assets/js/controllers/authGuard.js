import { getCurrentUser } from "../models/authModel.js";

const publicPages = ["login.html", "signup.html"];
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentUser = getCurrentUser();

if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

if (currentUser && publicPages.includes(currentPage)) {
  window.location.href = "index.html";
}
