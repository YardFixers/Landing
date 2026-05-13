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
LOGOUT
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
LOAD SAVED DATA
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

document.getElementById(
"visitCount"
).innerText = visits;

document.getElementById(
"requestCount"
).innerText = requests.length;

document.getElementById(
"feedbackCount"
).innerText = feedback.length;

/* =========================
REVENUE TOTAL
========================= */

let totalRevenue = 0;

requests.forEach(req=>{

const price =
Number(
req.price.replace(/\D/g,"")
);

totalRevenue += price;

});

document.getElementById(
"revenueCount"
).innerText =
"$" + totalRevenue;

/* =========================
REAL REQUESTS
========================= */

const requestContainer =
document.getElementById(
"requestContainer"
);

if(requestContainer){

if(requests.length === 0){

requestContainer.innerHTML = `

<div class="request-box">

<h3>
No requests yet
</h3>

<p>
Requests sent from the site
will appear here.
</p>

</div>

`;

}else{

requests.forEach(req=>{

requestContainer.innerHTML += `

<div class="request-box">

<h3>
${req.price}
</h3>

<p>
<b>Name:</b> ${req.name}
</p>

<p>
<b>Area:</b> ${req.area}
</p>

<p>
<b>Phone:</b> ${req.phone}
</p>

<p>
<b>Mowing:</b> ${req.mowing}
</p>

<p>
<b>Power Washing:</b> ${req.washing}
</p>

<p>
<b>Weeding:</b> ${req.weeding}
</p>

<p>
<b>Message:</b> ${req.message}
</p>

<p>
<b>Date:</b> ${req.date}
</p>

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
REAL FEEDBACK
========================= */

const feedbackContainer =
document.getElementById(
"feedbackContainer"
);

if(feedbackContainer){

if(feedback.length === 0){

feedbackContainer.innerHTML = `

<div class="feedback-admin-box">

<p>
No feedback yet.
</p>

</div>

`;

}else{

feedback.forEach(item=>{

feedbackContainer.innerHTML += `

<div class="feedback-admin-box">

<div class="admin-stars">
${item.stars}
</div>

<p>
${item.message}
</p>

<span>
— ${item.name}
</span>

</div>

`;

});

}

}

/* =========================
ACCEPT / REJECT BUTTONS
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
".7";

}

if(
e.target.classList.contains(
"reject-btn"
)
){

e.target.innerText =
"Rejected";

e.target.style.opacity =
".7";

}

});
