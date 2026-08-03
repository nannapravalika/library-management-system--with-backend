const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const totalBooks = document.getElementById("totalBooks");
const totalMembers = document.getElementById("totalMembers");
const issuedBooks = document.getElementById("issuedBooks");
const availableBooks = document.getElementById("availableBooks");
const adminName = document.getElementById("adminName");
const recentBooksBody = document.getElementById("recentBooksBody");

// Load dashboard statistics
async function loadDashboard() {

    try {

        const response = await fetch(`${BASE_URL}/dashboard`, {
            headers: authHeader()
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        totalBooks.innerText = data.dashboard.totalBooks;
        totalMembers.innerText = data.dashboard.totalMembers;
        issuedBooks.innerText = data.dashboard.totalIssued;
        availableBooks.innerText = data.dashboard.availableBooks;

    } catch (error) {

        console.log(error);

    }

}

// Load recent books
async function loadRecentBooks() {

    try {

        const response = await fetch(`${BASE_URL}/books`, {
            headers: authHeader()
        });

        const data = await response.json();

        recentBooksBody.innerHTML = "";

        data.books.slice(0, 5).forEach(book => {

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

        console.log(error);

    }

}

// Load admin details
function loadAdmin() {

    const admin = JSON.parse(localStorage.getItem("admin"));

    if (admin) {
        adminName.innerText = admin.name;
    }

}

window.onload = async () => {

    loadAdmin();

    await loadDashboard();

    await loadRecentBooks();

};

// Logout
if (typeof logout !== "function") {

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        window.location.href = "../index.html";

    }

}