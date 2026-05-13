// FILE NAME: dashboard.js

/* =========================
   DEV ACCOUNT
========================= */

const OWNER_USERNAME =
"YardFixers";

const OWNER_PASSWORD =
"+zr4bf+=ef#4";

/* =========================
   FORCE LOGOUT ON REFRESH
========================= */

window.addEventListener(
"beforeunload",
()=>{

sessionStorage.removeItem(
"ownerLoggedIn"
);

});

/* =========================
   LOGIN
========================= */

const loginScreen =
document.getElementById(
"loginScreen"
);

const dashboardContainer =
document.getElementById(
"dashboardContainer"
);

dashboardContainer.style.display =
"none";

function loginOwner(){

const username =
document.getElementById(
"ownerUser"
).value;

const password =
document.getElementById(
"ownerPass"
).value;

const error =
document.getElementById(
"loginError"
);

if(
username === OWNER_USERNAME &&
password === OWNER_PASSWORD
){

sessionStorage.setItem(
"ownerLoggedIn",
"true"
);

loginScreen.style.display =
"none";

dashboardContainer.style.display =
"block";

loadDashboard();

}else{

error.innerText =
"Incorrect Login";

}

}

/* =========================
   LOGOUT
========================= */

function logoutOwner(){

sessionStorage.removeItem(
"ownerLoggedIn"
);

location.reload();

}

/* =========================
   BACK TO SITE
========================= */

function backToSite(){

const confirmLeave =
confirm(
"Leaving the owner page will log you out. Continue?"
);

if(confirmLeave){

sessionStorage.removeItem(
"ownerLoggedIn"
);

window.location.href =
"index.html";

}

}

/* =========================
   LOAD DASHBOARD
========================= */

async function loadDashboard(){

try{

const response =
await fetch(
"/dashboard-data"
);

const data =
await response.json();

/* COUNTS */

document.getElementById(
"visitorCount"
).innerText =
data.visitors?.length || 0;

document.getElementById(
"requestCount"
).innerText =
data.orders?.length || 0;

document.getElementById(
"feedbackCount"
).innerText =
data.feedback?.length || 0;

document.getElementById(
"userCount"
).innerText =
data.users?.length || 0;

/* REQUESTS */

const requests =
document.getElementById(
"requestsContainer"
);

requests.innerHTML = "";

(data.orders || [])
.slice()
.reverse()
.forEach(order=>{

requests.innerHTML += `

<div class="dash-item">

<h3>
${order.Name || "Unknown"}
</h3>

<p>
<b>Email:</b>
${order.Email || ""}
</p>

<p>
<b>Phone:</b>
${order.Phone || ""}
</p>

<p>
<b>Area:</b>
${order.Area || ""}
</p>

<p>
<b>Message:</b>
${order.Message || ""}
</p>

</div>

`;

});

/* VISITORS */

const visitors =
document.getElementById(
"visitorContainer"
);

visitors.innerHTML = "";

(data.visitors || [])
.slice()
.reverse()
.forEach(visitor=>{

visitors.innerHTML += `

<div class="dash-item">

<p>
<b>Screen:</b>
${visitor.width || 0} x
${visitor.height || 0}
</p>

<p>
<b>Visited:</b>
${visitor.time || ""}
</p>

</div>

`;

});

}catch(error){

console.log(error);

}

}
