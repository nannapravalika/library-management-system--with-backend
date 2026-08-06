// =======================================
// Login
// =======================================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

// Redirect if already logged in
if (isLoggedIn()) {
    window.location.href = "dashboard.html";
}

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = loginForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "Logging in...";

    message.textContent = "";

    const email = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Basic Validation
    if (!email || !password) {

        message.style.color = "red";
        message.textContent = "Email and Password are required.";

        submitBtn.disabled = false;
        submitBtn.textContent = "Login";

        return;
    }

    try {

        const response = await fetch(`${BASE_URL}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await handleResponse(response);

        if (!data) return;

        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));

        message.style.color = "green";
        message.textContent = "Login Successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        message.style.color = "red";
        message.textContent = error.message || "Unable to login.";

    } finally {

        submitBtn.disabled = false;
        submitBtn.textContent = "Login";

    }

});