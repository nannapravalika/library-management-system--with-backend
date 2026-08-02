let members = JSON.parse(localStorage.getItem("members")) || [];

function saveMembers() {

localStorage.setItem("members", JSON.stringify(members));

}

function displayMembers() {

const tbody = document.querySelector("#memberTable tbody");

tbody.innerHTML = "";

members.forEach((member,index)=>{

tbody.innerHTML += `

<tr>

<td>${member.name}</td>

<td>${member.email}</td>

<td>${member.phone}</td>

<td>

<button onclick="editMember(${index})">

Edit

</button>

<button onclick="deleteMember(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function addMember(){

const name=document.getElementById("memberName").value;

const email=document.getElementById("memberEmail").value;

const phone=document.getElementById("memberPhone").value;

if(name===""||email===""||phone===""){

alert("Please fill all fields");

return;

}

members.push({

name,

email,

phone

});

saveMembers();

displayMembers();

document.getElementById("memberName").value="";

document.getElementById("memberEmail").value="";

document.getElementById("memberPhone").value="";

}

function editMember(index){

const member=members[index];

document.getElementById("memberName").value=member.name;

document.getElementById("memberEmail").value=member.email;

document.getElementById("memberPhone").value=member.phone;

members.splice(index,1);

saveMembers();

displayMembers();

}

function deleteMember(index){

if(confirm("Delete this member?")){

members.splice(index,1);

saveMembers();

displayMembers();

}

}

function searchMembers(){

const value=document.getElementById("searchMember").value.toLowerCase();

const rows=document.querySelectorAll("#memberTable tbody tr");

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)

? ""

: "none";

});

}

displayMembers();