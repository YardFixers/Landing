async function loadDashboard(){

  const response = await fetch("/dashboard-data");

  const data = await response.json();

  const stats = document.getElementById("stats");

  stats.innerHTML = `
  
    <h2>Total Visitors: ${data.visitors.length}</h2>

    <h2>Total Orders: ${data.orders.length}</h2>

    <hr>

    ${data.orders.map(order=>`
    
      <div style="
        background:white;
        padding:20px;
        border-radius:20px;
        margin:20px 0;
      ">

      <h3>${order.name}</h3>

      <p>Email: ${order.email}</p>

      <p>Phone: ${order.phone}</p>

      <p>Area: ${order.area}</p>

      <p>Service: ${order.service}</p>

      <p>Price: ${order.price}</p>

      <p>IP: ${order.ip}</p>

      </div>

    `).join("")}

  `;

}

loadDashboard();
