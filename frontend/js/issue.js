let issues = JSON.parse(localStorage.getItem("issues")) || [];

function saveIssues() {

localStorage.setItem("issues", JSON.stringify(issues));

}

function displayIssues(){

const tbody=document.querySelector("#issueTable tbody");

tbody.innerHTML="";

issues.forEach((issue,index)=>{

tbody.innerHTML +=`

<tr>

<td>${issue.book}</td>

<td>${issue.member}</td>

<td>${issue.issueDate}</td>

<td>${issue.returnDate}</td>

<td>${issue.status}</td>

<td>

<button onclick="returnBook(${index})">

Return

</button>

<button onclick="deleteIssue(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function issueBook(){

const book=document.getElementById("bookName").value;

const member=document.getElementById("memberName").value;

const issueDate=document.getElementById("issueDate").value;

const returnDate=document.getElementById("returnDate").value;

if(book===""||member===""||issueDate===""||returnDate===""){

alert("Please fill all fields");

return;

}

issues.push({

book,

member,

issueDate,

returnDate,

status:"Issued"

});

saveIssues();

displayIssues();

document.getElementById("bookName").value="";
document.getElementById("memberName").value="";
document.getElementById("issueDate").value="";
document.getElementById("returnDate").value="";

}

function returnBook(index){

issues[index].status="Returned";

saveIssues();

displayIssues();

}

function deleteIssue(index){

if(confirm("Delete this record?")){

issues.splice(index,1);

saveIssues();

displayIssues();

}

}

function searchIssues(){

const value=document.getElementById("searchIssue").value.toLowerCase();

const rows=document.querySelectorAll("#issueTable tbody tr");

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)

? ""

: "none";

});

}

displayIssues();