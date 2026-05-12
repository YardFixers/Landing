function login(){

const user=
document.getElementById("user").value;

const pass=
document.getElementById("pass").value;

if(
user==="YardFixers" &&
pass==="+zr4bf+=ef#4"
){

document.getElementById(
"dashboard"
).style.display="block";

loadDashboard();

}else{

alert("Wrong Login");

}

}

async function loadDashboard(){

const response=
await fetch("/dashboard");

const data=
await response.json();

const stats=
document.getElementById("stats");

stats.innerHTML=`

<h3>
Visitors:
${data.visitors.length}
</h3>

<h3>
Orders:
${data.orders.length}
</h3>

${data.orders.map(order=>`

<div class="card">

<h2>
${order.name}
</h2>

<p>
Email:
${order.email}
</p>

<p>
Phone:
${order.phone}
</p>

<p>
Area:
${order.area}
</p>

<p>
Service:
${order.service}
</p>

<p>
Yard:
${order.yardSize}
</p>

<p>
Status:
${order.status}
</p>

<p>
IP:
${order.ip}
</p>

</div>

`).join("")}

`;

}
