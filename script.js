/* NAVBAR */

const navbar =
document.getElementById(
"navbar"
);

let lastScroll = 0;

window.addEventListener(
"scroll",
()=>{

const currentScroll =
window.pageYOffset;

if(
currentScroll > lastScroll &&
currentScroll > 100
){

navbar.classList.add(
"nav-hidden"
);

}else{

navbar.classList.remove(
"nav-hidden"
);

}

lastScroll =
currentScroll;

});

/* ACCOUNTS */

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
).value;

const email =
document.getElementById(
"signupEmail"
).value;

const password =
document.getElementById(
"signupPassword"
).value;

let accounts =
getAccounts();

accounts.push({
name,
email,
password,
points:0
});

saveAccounts(accounts);

localStorage.setItem(
"yardCurrentUser",
JSON.stringify({
name,
email
})
);

updateAccountUI();

}

function loginUser(){

const email =
document.getElementById(
"loginEmail"
).value;

const password =
document.getElementById(
"loginPassword"
).value;

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
"Wrong login info."
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

/* REVIEW SCROLL */

const track =
document.querySelector(
".testimonial-track"
);

if(track){

let scrollAmount = 0;

function autoScroll(){

scrollAmount += .4;

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
