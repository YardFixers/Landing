// FILE NAME: script.js

/* =========================
   PRICE CALCULATOR
========================= */

const serviceCheckboxes =
document.querySelectorAll(
'.multi-services input[type="checkbox"]'
);

const yardSizeSelect =
document.querySelector(
'select[name="Yard Size"]'
);

const totalPrice =
document.getElementById(
'totalPrice'
);

function updatePrice(){

let basePrice = 0;

let selectedServices = [];

/* SERVICES */

serviceCheckboxes.forEach(box=>{

if(box.checked){

basePrice += Number(
box.dataset.price
);

selectedServices.push(
box.value
);

}

});

/* SIZE MULTIPLIER */

let multiplier = 1;

const yardSize =
yardSizeSelect.value;

if(
yardSize.includes("Medium")
){

multiplier = 1.6;

}

if(
yardSize.includes("Large")
){

multiplier = 2.3;

}

/* TOTAL */

let finalPrice =
basePrice * multiplier;

/* DISCOUNT */

let discountText = "";

if(selectedServices.length === 3){

finalPrice =
finalPrice * 0.85;

discountText =
" • 15% OFF Applied";

}

finalPrice =
Math.round(finalPrice);

/* DISPLAY */

totalPrice.innerText =
`$${finalPrice}${discountText}`;

}

/* EVENTS */

serviceCheckboxes.forEach(box=>{

box.addEventListener(
"change",
updatePrice
);

});

yardSizeSelect.addEventListener(
"change",
updatePrice
);

/* INITIAL */

updatePrice();

/* =========================
   PHONE FORMAT
========================= */

const phone =
document.getElementById(
"phone"
);

if(phone){

phone.addEventListener(
"input",
e=>{

let input =
e.target.value.replace(/\D/g,'');

if(input.length > 11){

input =
input.slice(0,11);

}

let formatted = "";

if(input.length > 0){

formatted += "1+ ";

}

if(input.length > 1){

formatted += "(" +
input.substring(1,4);

}

if(input.length >= 4){

formatted += ") " +
input.substring(4,7);

}

if(input.length >= 7){

formatted += "-" +
input.substring(7,11);

}

e.target.value =
formatted;

});
}

/* =========================
   NAVBAR HIDE ON SCROLL
========================= */

const navbar =
document.getElementById(
"navbar"
);

let lastScroll = 0;

window.addEventListener(
"scroll",
()=>{

const currentScroll =
window.pageYOffset;

if(
currentScroll > lastScroll &&
currentScroll > 100
){

navbar.classList.add(
"nav-hidden"
);

}else{

navbar.classList.remove(
"nav-hidden"
);

}

lastScroll =
currentScroll;

});

/* =========================
   FORM SUCCESS
========================= */

const orderForm =
document.getElementById(
"orderForm"
);

if(orderForm){

orderForm.addEventListener(
"submit",
()=>{

setTimeout(()=>{

alert(
"Request Sent!"
);

},500);

});
}

const feedbackForm =
document.getElementById(
"feedbackForm"
);

if(feedbackForm){

feedbackForm.addEventListener(
"submit",
()=>{

setTimeout(()=>{

alert(
"Feedback Sent!"
);

},500);

});
}

/* =========================
   TESTIMONIAL AUTO SCROLL
========================= */

const track =
document.querySelector(
".testimonial-track"
);

if(track){

let scrollAmount = 0;

function autoScroll(){

scrollAmount += 1;

if(
scrollAmount >=
track.scrollWidth / 2
){

scrollAmount = 0;

}

track.style.transform =
`translateX(-${scrollAmount}px)`;

requestAnimationFrame(
autoScroll
);

}

autoScroll();

}

/* =========================
   VISITOR TRACKING
========================= */

async function trackVisit(){

try{

await fetch(
"/track-visit",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

width:
window.innerWidth,

height:
window.innerHeight,

time:
new Date()

})

}

);

}catch(err){

console.log(err);

}

}

trackVisit();
