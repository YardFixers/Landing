/* PHONE FORMAT */

const phone =
document.getElementById("phone");

if(phone){

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

}

/* ACCOUNT SYSTEM */

let currentUser =
JSON.parse(
localStorage.getItem(
"yardfixersUser"
)
);

function updateLoginUI(){

const status =
document.getElementById(
"accountStatus"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
);

const emailInput =
document.getElementById(
"emailInput"
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

if(emailInput){

emailInput.value =
currentUser.email;
}

}else{

status.innerText =
"Not Logged In";

if(logoutBtn){

logoutBtn.style.display =
"none";
}

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

alert("Account Created");

}else{

alert(result.message);

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

/* DEV LOGIN */

if(

email==="yardfixers00@gmail.com" &&

password==="+zr4bf+=ef#4"

){

currentUser = {

email:"yardfixers00@gmail.com",
points:9999

};

localStorage.setItem(

"yardfixersUser",

JSON.stringify(currentUser)

);

updateLoginUI();

alert("Developer Login");

return;

}

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

alert("Logged In");

}else{

alert("Wrong Login");

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

/* PRICE COUNTER */

const checkboxes =
document.querySelectorAll(
".multi-services input"
);

const yardSelect =
document.querySelector(
"select[name='yardSize']"
);

const totalPrice =
document.getElementById(
"totalPrice"
);

function calculatePrice(){

let total = 0;

checkboxes.forEach(box=>{

if(box.checked){

total +=
Number(
box.dataset.price
);

}

});

if(yardSelect){

const yard =
yardSelect.value;

if(yard.includes("Small")){

total += 10;

}

if(yard.includes("Medium")){

total += 20;

}

if(yard.includes("Large")){

total += 35;

}

}

if(currentUser){

const discount =
Math.floor(
currentUser.points / 50
);

total -= discount;

}

if(total < 0){

total = 0;

}

if(totalPrice){

totalPrice.innerText =
"$" + total;
}

}

checkboxes.forEach(box=>{

box.addEventListener(
"change",
calculatePrice
);

});

if(yardSelect){

yardSelect.addEventListener(
"change",
calculatePrice
);

}

calculatePrice();

/* REQUEST */

const orderForm =
document.getElementById(
"orderForm"
);

if(orderForm){

orderForm.addEventListener(

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

name:orderForm.name.value,

email:orderForm.email.value,

phone:orderForm.phone.value,

area:orderForm.area.value,

services,

yardSize:orderForm.yardSize.value,

message:orderForm.message.value,

price:
totalPrice.innerText

};

const response =
await fetch("/request",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

if(response.ok){

alert("Sent!");

orderForm.reset();

calculatePrice();

}

});

}

/* FEEDBACK */

const feedbackForm =
document.getElementById(
"feedbackForm"
);

if(feedbackForm){

feedbackForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

const data = {

name:
feedbackForm.feedbackName.value,

email:
feedbackForm.feedbackEmail.value,

message:
feedbackForm.feedbackMessage.value

};

const response =
await fetch("/feedback",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

if(response.ok){

alert("Sent!");

feedbackForm.reset();

}

});

}

/* TRACK */

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
