/* =========================
PHONE FORMAT
========================= */

const phone =
document.getElementById("phone");

phone.addEventListener("input",(e)=>{

let input =
e.target.value.replace(/\D/g,'');

if(input.startsWith("1")){

input=input.substring(1);

}

input=input.substring(0,10);

let formatted="1+ ";

if(input.length>0){

formatted += "(" +
input.substring(0,3);

}

if(input.length>=4){

formatted += ") " +
input.substring(3,6);

}

if(input.length>=7){

formatted += "-" +
input.substring(6,10);

}

e.target.value=formatted;

});

/* =========================
TRACK USER
========================= */

const startTime = Date.now();

window.addEventListener(

"beforeunload",

async()=>{

const timeSpent =
Math.floor(
(Date.now()-startTime)/1000
);

await fetch("/track",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

timeSpent,

width:window.innerWidth,

height:window.innerHeight

})

});

});

/* =========================
ACCOUNT SYSTEM
========================= */

let currentUser =
JSON.parse(
localStorage.getItem(
"yardfixersUser"
)
);

/* UPDATE LOGIN UI */

function updateLoginUI(){

const status =
document.getElementById(
"accountStatus"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(currentUser){

status.innerHTML =

`
Logged In As:
<strong>
${currentUser.email}
</strong>

<br><br>

Reward Points:
<strong>
${currentUser.points}
</strong>
`;

logoutBtn.style.display =
"block";

}else{

status.innerText =
"Not Logged In";

logoutBtn.style.display =
"none";

}

}

updateLoginUI();

/* SIGNUP */

async function signup(){

const email =
document.getElementById(
"accountEmail"
).value;

const password =
document.getElementById(
"accountPassword"
).value;

if(!email || !password){

alert("Fill Out Everything");

return;

}

const response =
await fetch("/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

});

const result =
await response.json();

if(result.success){

currentUser =
result.user;

localStorage.setItem(

"yardfixersUser",

JSON.stringify(result.user)

);

updateLoginUI();

}else{

document.getElementById(
"accountStatus"
).innerText =
result.message;

}

}

/* LOGIN */

async function login(){

const email =
document.getElementById(
"accountEmail"
).value;

const password =
document.getElementById(
"accountPassword"
).value;

const response =
await fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

});

const result =
await response.json();

if(result.success){

currentUser =
result.user;

localStorage.setItem(

"yardfixersUser",

JSON.stringify(result.user)

);

updateLoginUI();

}else{

document.getElementById(
"accountStatus"
).innerText =
"Wrong Login";

}

}

/* LOGOUT */

function logout(){

localStorage.removeItem(
"yardfixersUser"
);

currentUser = null;

updateLoginUI();

}

/* =========================
ORDER FORM
========================= */

const form =
document.getElementById(
"orderForm"
);

form.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

const checked =
document.querySelectorAll(
".multi-services input:checked"
);

const services =
Array.from(checked)
.map(box=>box.value)
.join(", ");

const data = {

name:form.name.value,

email:form.email.value,

phone:form.phone.value,

area:form.area.value,

services,

yardSize:form.yardSize.value,

message:form.message.value,

customer:
currentUser
? currentUser.email
: "Guest"

};

const response =
await fetch("/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result =
await response.json();

if(currentUser){

currentUser.points =
result.points;

localStorage.setItem(

"yardfixersUser",

JSON.stringify(currentUser)

);

}

/* THANK YOU PAGE */

if(result.success){

window.location.href =
"thankyou.html";

}

});
