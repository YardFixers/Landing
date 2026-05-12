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
TRACK VISITOR
========================= */

const startTime=Date.now();

window.addEventListener(

"beforeunload",

async()=>{

const timeSpent=
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

let currentUser = null;

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

document.getElementById(
"accountStatus"
).innerText =

result.success
? "Account Created"
: result.message;

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

currentUser=result.user;

localStorage.setItem(

"yardfixersUser",

JSON.stringify(result.user)

);

document.getElementById(
"accountStatus"
).innerText =
"Logged In";

}else{

document.getElementById(
"accountStatus"
).innerText =
"Wrong Login";

}

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

/* MULTI SERVICES */

const checked =
document.querySelectorAll(
".multi-services input:checked"
);

const services =
Array.from(checked)
.map(box=>box.value)
.join(", ");

const data={

name:form.name.value,

email:form.email.value,

phone:form.phone.value,

area:form.area.value,

services,

yardSize:form.yardSize.value,

message:form.message.value

};

const response=
await fetch("/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result=
await response.json();

if(result.success){

window.location.href=
"thankyou.html";

}

});
