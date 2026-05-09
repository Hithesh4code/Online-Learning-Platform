const USERS_KEY = "learnhub_users";
const CURRENT_USER_KEY = "learnhub_current_user";

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(name, email, password) {
  const users = getUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: "Account already exists for this email." };
  }

  const newUser = { id: `u_${Date.now()}`, name, email, password };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));
  return { ok: true };
}

export function login(email, password) {
  const users = getUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return !!getCurrentUser();
}
