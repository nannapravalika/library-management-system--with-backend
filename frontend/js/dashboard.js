// =======================================
// Authentication
// =======================================

if (!isLoggedIn()) {
    window.location.href = "login.html";
}

// =======================================
// DOM Elements
// =======================================

const totalBooks = document.getElementById("totalBooks");
const totalMembers = document.getElementById("totalMembers");
const issuedBooks = document.getElementById("issuedBooks");
const availableBooks = document.getElementById("availableBooks");
const adminName = document.getElementById("adminName");
const recentBooksBody = document.getElementById("recentBooksBody");

// =======================================
// Load Dashboard Statistics
// =======================================

async function loadDashboard() {

    try {

        const response = await fetch(`${BASE_URL}/dashboard`, {
            headers: authHeader()
        });

        const data = await handleResponse(response);

        if (!data) return;

        totalBooks.textContent = data.dashboard.totalBooks;
        totalMembers.textContent = data.dashboard.totalMembers;
        issuedBooks.textContent = data.dashboard.totalIssued;
        availableBooks.textContent = data.dashboard.availableBooks;

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// =======================================
// Load Recent Books
// =======================================

async function loadRecentBooks() {

    try {

        const response = await fetch(`${BASE_URL}/books`, {
            headers: authHeader()
        });

        const data = await handleResponse(response);

        if (!data) return;

        recentBooksBody.innerHTML = "";

        if (data.books.length === 0) {

            recentBooksBody.innerHTML = `
                <tr>
                    <td colspan="4">No Books Available</td>
                </tr>
            `;

            return;
        }

        data.books
            .slice(0, 5)
            .forEach(book => {

                recentBooksBody.innerHTML += `
                    <tr>
                        <td>${book.bookId}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.availableCopies > 0 ? "Available" : "Issued"}</td>
                    </tr>
                `;

            });

    } catch (error) {

        console.error(error);

    }

}

// =======================================
// Load Admin Information
// =======================================

function loadAdmin() {

    const admin = getAdmin();

    if (admin) {
        adminName.textContent = admin.name;
    } else {
        adminName.textContent = "Administrator";
    }

}

// =======================================
// Initialize Dashboard
// =======================================

async function initializeDashboard() {

    loadAdmin();

    await loadDashboard();

    await loadRecentBooks();

}

window.addEventListener("DOMContentLoaded", initializeDashboard);

// =======================================
// Auto Refresh Every 30 Seconds
// =======================================

setInterval(() => {

    loadDashboard();

    loadRecentBooks();

}, 30000);

console.log("Dashboard Loaded Successfully");