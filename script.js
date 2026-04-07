
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar-nav");
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        navbar.querySelectorAll(".btn").forEach(btn => btn.remove());

        const welcomeLi = document.createElement("li");
        welcomeLi.className = "nav-item";
        welcomeLi.innerHTML = `<span class="navbar-text text-white me-2">Welcome, ${currentUser}</span>`;
        navbar.appendChild(welcomeLi);

        const logoutLi = document.createElement("li");
        logoutLi.className = "nav-item";
        logoutLi.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`;
        navbar.appendChild(logoutLi);
    }
});

function signup() {
    const username = document.getElementById("signupUser").value.trim();
    const password = document.getElementById("signupPass").value.trim();

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === username)) {
        alert("Username already exists.");
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign Up successful! You can now log in.");
    window.location.href = "login.html";
}

function login() {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}
