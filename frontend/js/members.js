// =====================================
// Member Management
// =====================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// Form Elements
const editingMemberId = document.getElementById("editingMemberId");

const memberId = document.getElementById("memberId");
const memberName = document.getElementById("memberName");
const memberEmail = document.getElementById("memberEmail");
const memberPhone = document.getElementById("memberPhone");
const memberAddress = document.getElementById("memberAddress");
const memberStatus = document.getElementById("memberStatus");

const memberBtn = document.getElementById("memberBtn");

const tableBody = document.getElementById("memberTableBody");

const searchInput = document.getElementById("searchMember");

// =====================================
// Load Members
// =====================================

async function loadMembers() {

    try {

        const response = await fetch(`${BASE_URL}/members`, {

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        renderMembers(data.members);

    }

    catch (error) {

        console.log(error);

        alert("Unable to load members.");

    }

}

// =====================================
// Render Members
// =====================================

function renderMembers(members) {

    tableBody.innerHTML = "";

    if (members.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No Members Found</td>
            </tr>
        `;

        return;

    }

    members.forEach(member => {

        tableBody.innerHTML += `

        <tr>

            <td>${member.memberId}</td>

            <td>${member.name}</td>

            <td>${member.email}</td>

            <td>${member.phone}</td>

            <td>${member.address}</td>

            <td>${member.status}</td>

            <td>

                <button onclick="editMember('${member._id}')">

                    Edit

                </button>

                <button onclick="deleteMember('${member._id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// =====================================
// Search Members
// =====================================

async function searchMembers() {

    const keyword = searchInput.value.trim();

    try {

        const response = await fetch(

            `${BASE_URL}/members/search?keyword=${encodeURIComponent(keyword)}`,

            {

                headers: authHeader()

            }

        );

        const data = await response.json();

        renderMembers(data.members);

    }

    catch (error) {

        console.log(error);

    }

}
// =====================================
// Save Member
// =====================================

async function saveMember() {

    if (editingMemberId.value === "") {

        addMember();

    } else {

        updateMember();

    }

}

// =====================================
// Add Member
// =====================================

async function addMember() {

    const member = {

        memberId: memberId.value.trim(),
        name: memberName.value.trim(),
        email: memberEmail.value.trim(),
        phone: memberPhone.value.trim(),
        address: memberAddress.value.trim(),
        status: memberStatus.value

    };

    if (
        !member.memberId ||
        !member.name ||
        !member.email ||
        !member.phone ||
        !member.address
    ) {

        alert("Please fill all required fields.");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/members`, {

            method: "POST",

            headers: authHeader(),

            body: JSON.stringify(member)

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Member Added Successfully.");

        clearMemberForm();

        loadMembers();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// =====================================
// Edit Member
// =====================================

async function editMember(id) {

    try {

        const response = await fetch(`${BASE_URL}/members/${id}`, {

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        const member = data.member;

        editingMemberId.value = member._id;

        memberId.value = member.memberId;

        memberName.value = member.name;

        memberEmail.value = member.email;

        memberPhone.value = member.phone;

        memberAddress.value = member.address;

        memberStatus.value = member.status;

        memberBtn.innerText = "Update Member";

    }

    catch (error) {

        console.log(error);

        alert("Unable to load member.");

    }

}

// =====================================
// Update Member
// =====================================

async function updateMember() {

    const member = {

        memberId: memberId.value.trim(),
        name: memberName.value.trim(),
        email: memberEmail.value.trim(),
        phone: memberPhone.value.trim(),
        address: memberAddress.value.trim(),
        status: memberStatus.value

    };

    try {

        const response = await fetch(

            `${BASE_URL}/members/${editingMemberId.value}`,

            {

                method: "PUT",

                headers: authHeader(),

                body: JSON.stringify(member)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Member Updated Successfully.");

        clearMemberForm();

        loadMembers();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}
// =====================================
// Delete Member
// =====================================

async function deleteMember(id) {

    if (!confirm("Are you sure you want to delete this member?")) {
        return;
    }

    try {

        const response = await fetch(`${BASE_URL}/members/${id}`, {

            method: "DELETE",

            headers: authHeader()

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Member Deleted Successfully.");

        loadMembers();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// =====================================
// Clear Form
// =====================================

function clearMemberForm() {

    editingMemberId.value = "";

    memberId.value = "";

    memberName.value = "";

    memberEmail.value = "";

    memberPhone.value = "";

    memberAddress.value = "";

    memberStatus.value = "Active";

    memberBtn.innerText = "Add Member";

}

// =====================================
// Load Members Automatically
// =====================================

window.onload = function () {

    loadMembers();

};

// =====================================
// Logout (Only if not already in config.js)
// =====================================

if (typeof logout !== "function") {

    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("admin");

        window.location.href = "../index.html";

    }

}