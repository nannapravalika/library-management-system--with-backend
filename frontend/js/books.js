// ===============================
// Book Management
// ===============================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ===============================
// Form Elements
// ===============================

const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookCategory = document.getElementById("bookCategory");
const bookId = document.getElementById("bookId");
const isbn = document.getElementById("isbn");
const quantity = document.getElementById("quantity");
const shelf = document.getElementById("shelf");

const editingBookId = document.getElementById("editingBookId");

const searchInput = document.getElementById("searchBook");

const tableBody = document.getElementById("bookTableBody");

const bookBtn = document.getElementById("bookBtn");

// ===============================
// Load All Books
// ===============================

async function loadBooks() {

    try {

        const response = await fetch(`${BASE_URL}/books`, {

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        renderBooks(data.books);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load books.");

    }

}

// ===============================
// Display Books
// ===============================

function renderBooks(books) {

    tableBody.innerHTML = "";

    if (books.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="9">

                    No Books Found

                </td>

            </tr>

        `;

        return;

    }

    books.forEach(book => {

        tableBody.innerHTML += `

            <tr>

                <td>${book.bookId}</td>

                <td>${book.title}</td>

                <td>${book.author}</td>

                <td>${book.category}</td>

                <td>${book.isbn}</td>

                <td>${book.quantity}</td>

                <td>${book.availableCopies}</td>

                <td>${book.shelf || "-"}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editBook('${book._id}')">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteBook('${book._id}')">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

// ===============================
// Search Books
// ===============================

async function searchBooks() {

    const keyword = searchInput.value.trim();

    try {

        const url = keyword

            ? `${BASE_URL}/books/search?keyword=${encodeURIComponent(keyword)}`

            : `${BASE_URL}/books`;

        const response = await fetch(url, {

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        renderBooks(data.books);

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Save Book
// ===============================

async function saveBook() {

    if (editingBookId.value === "") {

        addBook();

    }

    else {

        updateBook();

    }

}
next
next// ===============================
// Add Book
// ===============================

async function addBook() {

    const book = {

        bookId: bookId.value.trim(),

        title: bookTitle.value.trim(),

        author: bookAuthor.value.trim(),

        category: bookCategory.value.trim(),

        isbn: isbn.value.trim(),

        quantity: Number(quantity.value),

        shelf: shelf.value.trim()

    };

    if (
        !book.bookId ||
        !book.title ||
        !book.author ||
        !book.category ||
        !book.isbn ||
        !book.quantity
    ) {

        alert("Please fill all required fields.");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/books`, {

            method: "POST",

            headers: authHeader(),

            body: JSON.stringify(book)

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert(data.message);

        clearForm();

        loadBooks();

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ===============================
// Edit Book
// ===============================

async function editBook(id) {

    try {

        const response = await fetch(`${BASE_URL}/books/${id}`, {

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        const book = data.book;

        editingBookId.value = book._id;

        bookId.value = book.bookId;

        bookTitle.value = book.title;

        bookAuthor.value = book.author;

        bookCategory.value = book.category;

        isbn.value = book.isbn;

        quantity.value = book.quantity;

        shelf.value = book.shelf || "";

        bookBtn.innerText = "Update Book";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Update Book
// ===============================

async function updateBook() {

    const updatedBook = {

        bookId: bookId.value.trim(),

        title: bookTitle.value.trim(),

        author: bookAuthor.value.trim(),

        category: bookCategory.value.trim(),

        isbn: isbn.value.trim(),

        quantity: Number(quantity.value),

        shelf: shelf.value.trim()

    };

    try {

        const response = await fetch(

            `${BASE_URL}/books/${editingBookId.value}`,

            {

                method: "PUT",

                headers: authHeader(),

                body: JSON.stringify(updatedBook)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert(data.message);

        clearForm();

        loadBooks();

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}
// ===============================
// Delete Book
// ===============================

async function deleteBook(id) {

    const confirmDelete = confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/books/${id}`, {

            method: "DELETE",

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert(data.message);

        loadBooks();

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ===============================
// Clear Form
// ===============================

function clearForm() {

    editingBookId.value = "";

    document.getElementById("bookForm").reset();

    bookBtn.innerText = "Add Book";

}

// ===============================
// Initialize Page
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    loadBooks();

    searchInput.addEventListener("keyup", searchBooks);

});

// ===============================
// Logout
// ===============================

if (typeof logout !== "function") {

    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("admin");

        window.location.href = "../index.html";

    }

}