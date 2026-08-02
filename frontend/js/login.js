const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("loginMessage");

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

        const data = await response.json();

        if (!response.ok) {

            message.innerHTML = data.message;
            message.style.color = "red";
            return;

        }

        localStorage.setItem("token", data.token);

        localStorage.setItem("admin", JSON.stringify(data.admin));

        message.style.color = "green";

        message.innerHTML = "Login Successful";

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 800);

    }

    catch (error) {

        console.log(error);

        message.innerHTML = "Server Error";

        message.style.color = "red";

    }

});