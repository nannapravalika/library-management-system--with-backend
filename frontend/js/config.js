// =======================================
// API Configuration
// =======================================

const hostname = window.location.hostname;

const BASE_URL =
    hostname === "localhost" || hostname === "127.0.0.1"
        ? "http://localhost:5000/api"
        : `${window.location.origin}/api`;

// =======================================
// Authentication Helpers
// =======================================

function getToken() {
    return localStorage.getItem("token");
}

function getAdmin() {
    return JSON.parse(localStorage.getItem("admin"));
}

function isLoggedIn() {
    return !!getToken();
}

function authHeader() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

// =======================================
// Logout
// =======================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        window.location.href = "../index.html";
    }

}

// =======================================
// API Response Handler
// =======================================

async function handleResponse(response) {

    const data = await response.json();

    if (response.status === 401) {

        alert("Session expired. Please login again.");

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        window.location.href = "../login.html";

        return;
    }

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

console.log("Configuration Loaded Successfully");