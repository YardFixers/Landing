/* =========================
NAVBAR SCROLL
========================= */

const navbar =
document.getElementById(
"navbar"
);

let lastScroll = 0;

window.addEventListener(
"scroll",
()=>{

const current =
window.pageYOffset;

if(
current > lastScroll &&
current > 100
){

navbar.classList.add(
"nav-hidden"
);

}else{

navbar.classList.remove(
"nav-hidden"
);

}

lastScroll = current;

});

/* =========================
ACCOUNT SYSTEM
========================= */

function getAccounts(){

return JSON.parse(
localStorage.getItem(
"yardAccounts"
)
) || [];

}

function saveAccounts(accounts){

localStorage.setItem(
"yardAccounts",
JSON.stringify(accounts)
);

}

function showSignup(){

document.getElementById(
"signupForm"
).classList.remove(
"hidden"
);

document.getElementById(
"loginForm"
).classList.add(
"hidden"
);

}

function showLogin(){

document.getElementById(
"loginForm"
).classList.remove(
"hidden"
);

document.getElementById(
"signupForm"
).classList.add(
"hidden"
);

}

function signupUser(){

const name =
document.getElementById(
"signupName"
).value.trim();

const email =
document.getElementById(
"signupEmail"
).value.trim();

const password =
document.getElementById(
"signupPassword"
).value.trim();

if(
!name ||
!email ||
!password
){

alert(
"Fill out all fields."
);

return;

}

let accounts =
getAccounts();

const exists =
accounts.find(
a=>a.email===email
);

if(exists){

alert(
"Account already exists."
);

return;

}

const newUser = {
name,
email,
password,
points:0
};

accounts.push(newUser);

saveAccounts(accounts);

localStorage.setItem(
"yardCurrentUser",
JSON.stringify(newUser)
);

updateAccountUI();

}

function loginUser(){

const email =
document.getElementById(
"loginEmail"
).value.trim();

const password =
document.getElementById(
"loginPassword"
).value.trim();

let accounts =
getAccounts();

const found =
accounts.find(
a=>
a.email===email &&
a.password===password
);

if(found){

localStorage.setItem(
"yardCurrentUser",
JSON.stringify(found)
);

updateAccountUI();

}else{

alert(
"Wrong email or password."
);

}

}

function logoutUser(){

localStorage.removeItem(
"yardCurrentUser"
);

updateAccountUI();

}

function updateAccountUI(){

const user =
JSON.parse(
localStorage.getItem(
"yardCurrentUser"
)
);

if(user){

document.getElementById(
"loggedOutView"
).style.display =
"none";

document.getElementById(
"loggedInView"
).style.display =
"block";

document.getElementById(
"welcomeText"
).innerText =
`Welcome ${user.name}`;

document.getElementById(
"requestEmail"
).value =
user.email;

document.getElementById(
"feedbackEmail"
).value =
user.email;

}else{

document.getElementById(
"loggedOutView"
).style.display =
"block";

document.getElementById(
"loggedInView"
).style.display =
"none";

}

}

updateAccountUI();

/* =========================
PRICE SYSTEM
========================= */

const checks =
document.querySelectorAll(
".service-check"
);

const yardSize =
document.getElementById(
"yardSize"
);

const totalPrice =
document.getElementById(
"totalPrice"
);

const bundleText =
document.getElementById(
"bundleText"
);

function calculatePrice(){

let total = 0;

let selected = 0;

checks.forEach(check=>{

if(check.checked){

selected++;

total += Number(
check.value
);

}

});

const multiplier =
Number(
yardSize.value
);

total =
total * multiplier;

if(selected === 3){

total =
Math.round(
total * 0.85
);

bundleText.innerText =
"15% Bundle Discount Applied";

}else{

bundleText.innerText =
"";

}

totalPrice.innerText =
`$${total}`;

}

checks.forEach(check=>{

check.addEventListener(
"change",
calculatePrice
);

});

yardSize.addEventListener(
"change",
calculatePrice
);

calculatePrice();

/* =========================
PHONE FORMAT
========================= */

const phone =
document.getElementById(
"phone"
);

phone.addEventListener(
"input",
e=>{

let x =
e.target.value
.replace(/\D/g,'');

x =
x.substring(0,11);

let formatted = "";

if(x.length > 0){

formatted = "1+ ";

}

if(x.length > 1){

formatted += "(" +
x.substring(1,4);

}

if(x.length >= 4){

formatted += ") " +
x.substring(4,7);

}

if(x.length >= 7){

formatted += "-" +
x.substring(7,11);

}

e.target.value =
formatted;

});

/* =========================
FORMSUBMIT AJAX
========================= */

async function sendForm(
form,
subject
){

const formData =
new FormData(form);

formData.append(
"_subject",
subject
);

formData.append(
"_captcha",
"false"
);

await fetch(
"https://formsubmit.co/ajax/yardfixers00@gmail.com",
{
method:"POST",
body:formData
}
);

}

const orderForm =
document.getElementById(
"orderForm"
);

orderForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const btn =
orderForm.querySelector(
"button"
);

btn.innerText =
"Sending...";

await sendForm(
orderForm,
"REQUEST"
);

btn.innerText =
"Sent!";

setTimeout(()=>{

btn.innerText =
"Send Request";

},2000);

orderForm.reset();

calculatePrice();

});

const feedbackForm =
document.getElementById(
"feedbackForm"
);

feedbackForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const btn =
feedbackForm.querySelector(
"button"
);

btn.innerText =
"Sending...";

await sendForm(
feedbackForm,
"FEEDBACK"
);

btn.innerText =
"Sent!";

setTimeout(()=>{

btn.innerText =
"Send Feedback";

},2000);

feedbackForm.reset();

});

/* =========================
TESTIMONIAL AUTO SCROLL
========================= */

const track =
document.querySelector(
".testimonial-track"
);

if(track){

let scrollAmount = 0;

function autoScroll(){

scrollAmount += 0.35;

if(
scrollAmount >=
track.scrollWidth / 2
){

scrollAmount = 0;

}

track.style.transform =
`translateX(-${scrollAmount}px)`;

requestAnimationFrame(
autoScroll
);

}

autoScroll();

}

/* =========================
VISITOR TRACKING
========================= */

let visitors =
JSON.parse(
localStorage.getItem(
"yardVisitors"
)
) || [];

visitors.push({

time:
new Date().toLocaleString(),

page:
window.location.pathname,

device:
navigator.userAgent

});

localStorage.setItem(
"yardVisitors",
JSON.stringify(visitors)
);
