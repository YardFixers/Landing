async function loadDashboard(){

try{

const response =
await fetch("/dashboard-data");

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
${order.name || "Unknown"}
</h3>

<p>
<b>Email:</b>
${order.email || ""}
</p>

<p>
<b>Phone:</b>
${order.phone || ""}
</p>

<p>
<b>Area:</b>
${order.area || ""}
</p>

<p>
<b>Message:</b>
${order.message || ""}
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
<b>IP:</b>
${visitor.ip || "Unknown"}
</p>

<p>
<b>Screen:</b>
${visitor.width || 0}x${visitor.height || 0}
</p>

</div>

`;

});

}catch(error){

console.log(error);

}

}

loadDashboard();
