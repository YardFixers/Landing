async function loadDashboard(){

const response =
await fetch("/dashboard-data");

const data =
await response.json();

/* COUNTS */

document.getElementById(
"visitorCount"
).innerText =
data.visitors.length;

document.getElementById(
"requestCount"
).innerText =
data.orders.length;

document.getElementById(
"feedbackCount"
).innerText =
data.feedback.length;

document.getElementById(
"userCount"
).innerText =
data.users.length;

/* REQUESTS */

const requests =
document.getElementById(
"requestsContainer"
);

data.orders.reverse().forEach(order=>{

requests.innerHTML += `

<div class="dash-item">

<h3>
${order.name}
</h3>

<p>
<b>Email:</b>
${order.email}
</p>

<p>
<b>Phone:</b>
${order.phone}
</p>

<p>
<b>Area:</b>
${order.area}
</p>

<p>
<b>Services:</b>
${order.services}
</p>

<p>
<b>Price:</b>
${order.price}
</p>

<p>
<b>Message:</b>
${order.message}
</p>

</div>

`;

});

/* FEEDBACK */

const feedback =
document.getElementById(
"feedbackContainer"
);

data.feedback.reverse().forEach(item=>{

feedback.innerHTML += `

<div class="dash-item">

<h3>
${item.name}
</h3>

<p>
<b>Email:</b>
${item.email}
</p>

<p>
${item.message}
</p>

</div>

`;

});

/* VISITORS */

const visitors =
document.getElementById(
"visitorContainer"
);

data.visitors.reverse().forEach(visitor=>{

visitors.innerHTML += `

<div class="dash-item">

<p>
<b>IP:</b>
${visitor.ip}
</p>

<p>
<b>Screen:</b>
${visitor.width}x${visitor.height}
</p>

<p>
<b>Time On Site:</b>
${visitor.timeSpent} seconds
</p>

</div>

`;

});

}

loadDashboard();
