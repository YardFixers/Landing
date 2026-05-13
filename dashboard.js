// FILE NAME: dashboard.js
// REPLACE YOUR CURRENT dashboard.js WITH THIS FULL FILE

/* =========================
   AUTO LOGOUT ON REFRESH
========================= */

sessionStorage.removeItem(
"ownerLoggedIn"
);

/* =========================
   ELEMENTS
========================= */

const loginScreen =
document.getElementById(
"loginScreen"
);

const dashboard =
document.getElementById(
"dashboard"
);

const loginBtn =
document.getElementById(
"loginBtn"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
);

const backBtn =
document.getElementById(
"backBtn"
);

const loginError =
document.getElementById(
"loginError"
);

/* =========================
   LOGIN
========================= */

loginBtn.addEventListener(
"click",
()=>{

const username =
document.getElementById(
"ownerUser"
).value;

const password =
document.getElementById(
"ownerPass"
).value;

if(
username === "YardFixers" &&
password === "+zr4bf+=ef#4"
){

sessionStorage.setItem(
"ownerLoggedIn",
"true"
);

loginScreen.classList.add(
"hidden"
);

dashboard.classList.remove(
"hidden"
);

loadDashboard();

}else{

loginError.style.display =
"block";

}

});

/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener(
"click",
()=>{

sessionStorage.removeItem(
"ownerLoggedIn"
);

location.reload();

});

/* =========================
   BACK BUTTON
========================= */

backBtn.addEventListener(
"click",
e=>{

e.preventDefault();

const leave =
confirm(
"Leaving the dashboard will log you out."
);

if(leave){

sessionStorage.removeItem(
"ownerLoggedIn"
);

window.location.href =
"index.html";

}

});

/* =========================
   STORAGE
========================= */

function getStorage(name){

return JSON.parse(
localStorage.getItem(name)
) || [];

}

/* =========================
   LOAD DASHBOARD
========================= */

function loadDashboard(){

const visitors =
getStorage("yardVisitors");

const requests =
getStorage("yardRequests");

const feedback =
getStorage("yardFeedback");

const accounts =
getStorage("yardAccounts");

/* COUNTS */

document.getElementById(
"visitorCount"
).innerText =
visitors.length;

document.getElementById(
"requestCount"
).innerText =
requests.length;

document.getElementById(
"feedbackCount"
).innerText =
feedback.length;

document.getElementById(
"accountCount"
).innerText =
accounts.length;

/* REQUESTS */

const requestList =
document.getElementById(
"requestList"
);

requestList.innerHTML = "";

requests
.slice()
.reverse()
.forEach(req=>{

requestList.innerHTML +=
`
<div class="item">

<strong>Name:</strong>
${req.name}<br>

<strong>Email:</strong>
${req.email}<br>

<strong>Phone:</strong>
${req.phone}<br>

<strong>Area:</strong>
${req.area}<br>

<strong>Mowing:</strong>
${req.mowing}<br>

<strong>Power Washing:</strong>
${req.washing}<br>

<strong>Weeding:</strong>
${req.weeding}<br>

<strong>Total:</strong>
${req.total}<br>

<strong>Time:</strong>
${req.time}<br><br>

<strong>Message:</strong><br>
${req.message}

</div>
`;

});

/* FEEDBACK */

const feedbackList =
document.getElementById(
"feedbackList"
);

feedbackList.innerHTML = "";

feedback
.slice()
.reverse()
.forEach(feed=>{

feedbackList.innerHTML +=
`
<div class="item">

<strong>Name:</strong>
${feed.name}<br>

<strong>Email:</strong>
${feed.email}<br>

<strong>Stars:</strong>
${feed.stars}<br>

<strong>Time:</strong>
${feed.time}<br><br>

<strong>Message:</strong><br>
${feed.message}

</div>
`;

});

/* VISITORS */

const visitorList =
document.getElementById(
"visitorList"
);

visitorList.innerHTML = "";

visitors
.slice()
.reverse()
.forEach(visitor=>{

visitorList.innerHTML +=
`
<div class="item">

<strong>Visited:</strong>
${visitor.time}<br><br>

<strong>Page:</strong><br>
${visitor.page}<br><br>

<strong>Device:</strong><br>
${visitor.device}

</div>
`;

});

}
