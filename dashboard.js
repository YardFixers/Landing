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
   ACCEPT REQUEST
========================= */

async function acceptRequest(
email,
name,
date,
time,
button
){

button.innerText =
"Sending...";

try{

await fetch(
"https://YOUR-RENDER-URL.onrender.com/accept",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

email,
name,
date,
time

})
}
);

button.innerText =
"Accepted ✓";

button.style.background =
"#79d64d";

}catch{

button.innerText =
"Error";

}

}

/* =========================
   REJECT REQUEST
========================= */

async function rejectRequest(
email,
name,
button
){

button.innerText =
"Sending...";

try{

await fetch(
"https://YOUR-RENDER-URL.onrender.com/reject",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

email,
name

})
}
);

button.innerText =
"Rejected";

button.style.background =
"#ff6b6b";

}catch{

button.innerText =
"Error";

}

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

/* =========================
   REQUESTS
========================= */

const requestList =
document.getElementById(
"requestList"
);

requestList.innerHTML = "";

requests
.slice()
.reverse()
.forEach((req,index)=>{

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

<div class="action-box">

<input
type="date"
id="date-${index}">

<input
type="time"
id="time-${index}">

<div class="action-buttons">

<button
class="accept-btn"
onclick="
acceptRequest(
'${req.email}',
'${req.name}',
document.getElementById('date-${index}').value,
document.getElementById('time-${index}').value,
this
)
">

Accept

</button>

<button
class="reject-btn"
onclick="
rejectRequest(
'${req.email}',
'${req.name}',
this
)
">

Reject

</button>

</div>

</div>

</div>
`;

});

/* =========================
   FEEDBACK
========================= */

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

/* =========================
   VISITORS
========================= */

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

/* =========================
   ACCOUNTS
========================= */

const accountList =
document.getElementById(
"accountList"
);

if(accountList){

accountList.innerHTML = "";

accounts
.slice()
.reverse()
.forEach(acc=>{

accountList.innerHTML +=
`
<div class="item">

<strong>Name:</strong>
${acc.name}<br>

<strong>Email:</strong>
${acc.email}<br>

<strong>Points:</strong>
${acc.points || 0}

</div>
`;

});

}

}
