/* =========================
DEV ACCESS CHECK
========================= */

const isDev =
sessionStorage.getItem(
"yardfixers_dev"
);

if(isDev !== "true"){

window.location.href =
"index.html";

}

/* =========================
LOGOUT BUTTON
========================= */

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

logoutBtn.addEventListener(
"click",
()=>{

const leave =
confirm(
"Leaving the owner page will log you out."
);

if(leave){

sessionStorage.removeItem(
"yardfixers_dev"
);

window.location.href =
"index.html";

}

});

}

/* =========================
LOAD STORAGE DATA
========================= */

const requests =
JSON.parse(
localStorage.getItem(
"yardfixers_requests"
) || "[]"
);

const feedback =
JSON.parse(
localStorage.getItem(
"yardfixers_feedback"
) || "[]"
);

const visits =
Number(
localStorage.getItem(
"yardfixers_visits"
) || 0
);

/* =========================
UPDATE STATS
========================= */

const visitCount =
document.getElementById(
"visitCount"
);

const requestCount =
document.getElementById(
"requestCount"
);

const feedbackCount =
document.getElementById(
"feedbackCount"
);

const revenueCount =
document.getElementById(
"revenueCount"
);

if(visitCount){

visitCount.innerText =
visits;

}

if(requestCount){

requestCount.innerText =
requests.length;

}

if(feedbackCount){

feedbackCount.innerText =
feedback.length;

}

/* =========================
REVENUE
========================= */

let totalRevenue = 0;

requests.forEach(req=>{

const price =
Number(
String(req.price)
.replace(/\D/g,"")
);

totalRevenue += price;

});

if(revenueCount){

revenueCount.innerText =
"$" + totalRevenue;

}

/* =========================
REQUESTS
========================= */

const requestContainer =
document.getElementById(
"requestContainer"
);

if(requestContainer){

requestContainer.innerHTML = "";

if(requests.length === 0){

requestContainer.innerHTML = `

<div class="request-box empty-box">

<h3>
No Requests Yet
</h3>

<p>
When customers send requests,
they will appear here.
</p>

</div>

`;

}else{

requests.forEach(req=>{

requestContainer.innerHTML += `

<div class="request-box">

<div class="request-top">

<h3>
${req.price || "$0"}
</h3>

<span class="request-date">
${req.date || ""}
</span>

</div>

<div class="request-grid">

<div>

<p>
<b>Name:</b>
${req.name || "Unknown"}
</p>

<p>
<b>Area:</b>
${req.area || "Unknown"}
</p>

<p>
<b>Phone:</b>
${req.phone || "Unknown"}
</p>

</div>

<div>

<p>
<b>Mowing:</b>
${req.mowing || "No"}
</p>

<p>
<b>Power Washing:</b>
${req.washing || "No"}
</p>

<p>
<b>Weeding:</b>
${req.weeding || "No"}
</p>

</div>

</div>

<div class="request-message">

${req.message || ""}

</div>

<div class="request-buttons">

<button class="accept-btn">
Accept
</button>

<button class="reject-btn">
Reject
</button>

</div>

</div>

`;

});

}

}

/* =========================
FEEDBACK
========================= */

const feedbackContainer =
document.getElementById(
"feedbackContainer"
);

if(feedbackContainer){

feedbackContainer.innerHTML = "";

if(feedback.length === 0){

feedbackContainer.innerHTML = `

<div class="feedback-admin-box empty-box">

<p>
No feedback submitted yet.
</p>

</div>

`;

}else{

feedback.forEach(item=>{

feedbackContainer.innerHTML += `

<div class="feedback-admin-box">

<div class="feedback-head">

<div class="admin-stars">
${item.stars || "5 Stars"}
</div>

<div class="feedback-name">
${item.name || "Anonymous"}
</div>

</div>

<p>
${item.message || ""}
</p>

</div>

`;

});

}

}

/* =========================
ACCEPT / REJECT
========================= */

document.addEventListener(
"click",
e=>{

if(
e.target.classList.contains(
"accept-btn"
)
){

e.target.innerText =
"Accepted";

e.target.style.opacity =
".75";

e.target.style.pointerEvents =
"none";

}

if(
e.target.classList.contains(
"reject-btn"
)
){

e.target.innerText =
"Rejected";

e.target.style.opacity =
".75";

e.target.style.pointerEvents =
"none";

}

});
