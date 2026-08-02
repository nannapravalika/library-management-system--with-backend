const hostname = window.location.hostname;

let BASE_URL = "";

if (hostname === "localhost" || hostname === "127.0.0.1") {
    BASE_URL = "http://localhost:5000/api";
} else {
    BASE_URL = `https://${window.location.host.replace("3000", "5000")}/api`;
}

function getToken() {
    return localStorage.getItem("token");
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}