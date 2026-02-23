// ================= SIGNUP FUNCTION =================
function signup() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  alert("Signup Successful!");
  window.location.href = "home.html";
}


// ================= LOGIN FUNCTION =================
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found! Please sign up first.");
    return;
  }

  if (storedUser.email === email && storedUser.password === password) {
    localStorage.setItem("loggedIn", "true");
    alert("Login Successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid Credentials!");
  }
}


// ================= LOGOUT FUNCTION =================
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
