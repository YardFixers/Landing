const startTime = Date.now();

/* TRACK USER */

window.addEventListener("beforeunload", async()=>{

  const timeSpent = Math.floor((Date.now() - startTime)/1000);

  await fetch("/track-visit",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      screenWidth:window.innerWidth,
      screenHeight:window.innerHeight,
      timeSpent
    })
  });

});

/* ORDER FORM */

const form = document.getElementById("yardForm");

form.addEventListener("submit", async(e)=>{

  e.preventDefault();

  const button = form.querySelector("button");

  button.innerText = "Sending...";

  const data = {
    name: form.Name.value,
    email: form.Email.value,
    phone: form.Phone.value,
    area: form.Area.value,
    service: form.Service.value,
    yardSize: form.YardSize.value,
    price: form.Price.value,
    message: form.Message.value
  };

  const response = await fetch("/submit-order",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });

  const result = await response.json();

  if(result.success){

    window.location.href = "thankyou.html";

  }else{

    button.innerText = "Error Sending";

  }

});
