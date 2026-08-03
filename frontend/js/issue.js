const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const bookSelect = document.getElementById("bookSelect");

const memberSelect = document.getElementById("memberSelect");

const issueDate = document.getElementById("issueDate");

const returnDate = document.getElementById("returnDate");

const tableBody = document.querySelector("#issueTable tbody");

const searchInput = document.getElementById("searchIssue");

// ==============================
// Load Books
// ==============================

async function loadBooks() {

    const response = await fetch(

        `${BASE_URL}/books`,

        {

            headers: authHeader()

        }

    );

    const data = await response.json();

    bookSelect.innerHTML =
        `<option value="">Select Book</option>`;

    data.books.forEach(book => {

        if (book.availableCopies > 0) {

            bookSelect.innerHTML += `

            <option value="${book._id}">

            ${book.title}

            (${book.availableCopies})

            </option>

            `;

        }

    });

}

// ==============================
// Load Members
// ==============================

async function loadMembers() {

    const response = await fetch(

        `${BASE_URL}/members`,

        {

            headers: authHeader()

        }

    );

    const data = await response.json();

    memberSelect.innerHTML =
        `<option value="">Select Member</option>`;

    data.members.forEach(member => {

        memberSelect.innerHTML += `

        <option value="${member._id}">

        ${member.name}

        </option>

        `;

    });

}

// ==============================
// Load Issue History
// ==============================

async function loadIssues() {

    const response = await fetch(

        `${BASE_URL}/issues`,

        {

            headers: authHeader()

        }

    );

    const data = await response.json();

    renderIssues(data.issues);

}

function renderIssues(issues) {

    tableBody.innerHTML = "";

    issues.forEach(issue => {

        tableBody.innerHTML += `

        <tr>

            <td>${issue.book.title}</td>

            <td>${issue.member.name}</td>

            <td>${new Date(issue.createdAt).toLocaleDateString()}</td>

            <td>

            ${issue.returnDate
                ? new Date(issue.returnDate).toLocaleDateString()
                : "-"}

            </td>

            <td>${issue.status}</td>

            <td>

            ${issue.status === "Issued"

            ? `<button onclick="returnBook('${issue._id}')">

            Return

            </button>`

            : "-"}

            </td>

        </tr>

        `;

    });

}
// ==============================
// Issue Book
// ==============================

async function issueBook() {

    const memberId = memberSelect.value;
    const bookId = bookSelect.value;
    const dueDate = returnDate.value;

    if (!memberId || !bookId || !dueDate) {

        alert("Please select a member, a book and due date.");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/issues`, {

            method: "POST",

            headers: authHeader(),

            body: JSON.stringify({

                memberId,
                bookId,
                dueDate

            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Book Issued Successfully.");

        bookSelect.value = "";
        memberSelect.value = "";
        issueDate.value = "";
        returnDate.value = "";

        loadBooks();
        loadIssues();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// ==============================
// Return Book
// ==============================

async function returnBook(issueId) {

    if (!confirm("Return this book?")) return;

    try {

        const response = await fetch(

            `${BASE_URL}/issues/return/${issueId}`,

            {

                method: "PUT",

                headers: authHeader()

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Book Returned Successfully.");

        loadBooks();
        loadIssues();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// ==============================
// Search Issues
// ==============================

function searchIssues() {

    const keyword = searchInput.value.toLowerCase();

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(keyword)
            ? ""
            : "none";

    });

}

// ==============================
// Load Page
// ==============================

window.onload = async () => {

    const today = new Date().toISOString().split("T")[0];

    issueDate.value = today;

    await loadBooks();

    await loadMembers();

    await loadIssues();

};

// ==============================
// Logout
// ==============================

if (typeof logout !== "function") {

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        window.location.href = "../index.html";

    }

}