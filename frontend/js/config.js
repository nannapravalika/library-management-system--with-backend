const hostname = window.location.hostname;

let BASE_URL = "";

if (hostname === "localhost" || hostname === "127.0.0.1") {

    BASE_URL = "http://localhost:5000/api";

} else {

    BASE_URL = `${window.location.origin}/api`;

}

function getToken() {

    return localStorage.getItem("token");

}

function authHeader() {

    return {

        "Content-Type": "application/json",

        "Authorization": `Bearer ${getToken()}`

    };

}

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    window.location.href = "../index.html";

}