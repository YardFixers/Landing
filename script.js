// script.js

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* NAVBAR SCROLL EFFECT */

window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if(window.scrollY > 50){
    navbar.style.background = "rgba(10,15,10,0.95)";
  }
  else{
    navbar.style.background = "rgba(10,15,10,0.75)";
  }

});

/* CONTACT FORM ANIMATION */

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const button = form.querySelector("button");

  button.innerText = "Message Sent!";
  button.style.background = "#5d9d35";

  setTimeout(() => {

    button.innerText = "Send Message";
    button.style.background = "#101612";

    form.reset();

  }, 3000);

});

/* SCROLL REVEAL ANIMATION */

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

}, {
  threshold:0.2
});

cards.forEach((card) => {

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.8s ease";

  observer.observe(card);

});
