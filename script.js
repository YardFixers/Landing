// script.js

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

/* MOBILE MENU */

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

/* NAVBAR EFFECT */

window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if(window.scrollY > 50){

    navbar.style.background = "rgba(10,15,10,0.95)";

  } else {

    navbar.style.background = "rgba(10,15,10,0.75)";

  }

});

/* CONTACT FORM */

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const button = form.querySelector("button");

  const formData = new FormData(form);

  button.innerText = "Sending...";
  button.style.background = "#5b9b35";

  try{

    await fetch(form.action, {
      method:"POST",
      body:formData
    });

    button.innerText = "Message Sent!";

    form.reset();

    setTimeout(() => {

      button.innerText = "Send Message";

      button.style.background = "#101612";

    }, 3000);

  }
  catch{

    button.innerText = "Error Sending";

    setTimeout(() => {

      button.innerText = "Send Message";

      button.style.background = "#101612";

    }, 3000);

  }

});

/* SCROLL REVEAL */

const cards = document.querySelectorAll(
  ".service-card, .trust-card, .person-card"
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

    }

  });

},{
  threshold:0.2
});

cards.forEach((card) => {

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.8s ease";

  observer.observe(card);

});
