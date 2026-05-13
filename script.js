// FILE NAME: script.js

/* =========================
   NAVBAR HIDE
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
   SAVE VISITOR
========================= */

function saveVisitor(){

let visitors =
JSON.parse(
localStorage.getItem(
"yardVisitors"
)
) || [];

visitors.push({

time:
new Date().toLocaleString(),

device:
navigator.userAgent,

page:
window.location.pathname

});

localStorage.setItem(
"yardVisitors",
JSON.stringify(visitors)
);

}

saveVisitor();

/* =========================
   SERVICE CHECKBOXES
========================= */

const mowingCheck =
document.getElementById(
"mowingCheck"
);

const washingCheck =
document.getElementById(
"washingCheck"
);

const weedingCheck =
document.getElementById(
"weedingCheck"
);

const mowingInput =
document.getElementById(
"mowingInput"
);

const washingInput =
document.getElementById(
"washingInput"
);

const weedingInput =
document.getElementById(
"weedingInput"
);

/* =========================
   PRICE CALCULATOR
========================= */

const yardSizeSelect =
document.querySelector(
'select[name="Yard Size"]'
);

const totalPrice =
document.getElementById(
"totalPrice"
);

function updatePrice(){

let basePrice = 0;

let selected = 0;

if(mowingCheck.checked){

basePrice += 18;
selected++;

mowingInput.value =
"Yes";

}else{

mowingInput.value =
"No";

}

if(washingCheck.checked){

basePrice += 24;
selected++;

washingInput.value =
"Yes";

}else{

washingInput.value =
"No";

}

if(weedingCheck.checked){

basePrice += 14;
selected++;

weedingInput.value =
"Yes";

}else{

weedingInput.value =
"No";

}

let multiplier = 1;

const yard =
yardSizeSelect.value;

if(yard.includes("Medium")){
multiplier = 2;
}

if(yard.includes("Large")){
multiplier = 3;
}

let finalPrice =
basePrice * multiplier;

let discountText = "";

if(selected === 3){

finalPrice =
finalPrice * 0.85;

discountText =
" • 15% OFF";

}

finalPrice =
Math.round(finalPrice);

totalPrice.innerText =
`$${finalPrice}${discountText}`;

}

[
mowingCheck,
washingCheck,
weedingCheck
].forEach(box=>{

box.addEventListener(
"change",
updatePrice
);

});

yardSizeSelect.addEventListener(
"change",
updatePrice
);

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
   SAVE REQUEST
========================= */

function saveRequest(){

let requests =
JSON.parse(
localStorage.getItem(
"yardRequests"
)
) || [];

requests.push({

name:
document.querySelector(
'#orderForm input[name="Name"]'
).value,

email:
document.querySelector(
'#orderForm input[name="Email"]'
).value,

phone:
document.querySelector(
'#orderForm input[name="Phone"]'
).value,

area:
document.querySelector(
'#orderForm input[name="Area"]'
).value,

mowing:
mowingInput.value,

washing:
washingInput.value,

weeding:
weedingInput.value,

total:
totalPrice.innerText,

message:
document.querySelector(
'#orderForm textarea'
).value,

time:
new Date().toLocaleString()

});

localStorage.setItem(
"yardRequests",
JSON.stringify(requests)
);

}

/* =========================
   SAVE FEEDBACK
========================= */

function saveFeedback(){

let feedback =
JSON.parse(
localStorage.getItem(
"yardFeedback"
)
) || [];

feedback.push({

name:
document.querySelector(
'#feedbackForm input[name="Name"]'
).value,

email:
document.querySelector(
'#feedbackForm input[name="Email"]'
).value,

stars:
ratingValue.value,

message:
document.querySelector(
'#feedbackForm textarea'
).value,

time:
new Date().toLocaleString()

});

localStorage.setItem(
"yardFeedback",
JSON.stringify(feedback)
);

}

/* =========================
   FORM SUBMIT
========================= */

async function sendForm(
form,
button
){

const original =
button.innerText;

const formData =
new FormData(form);

try{

await fetch(
form.action,
{
method:"POST",
body:formData
}
);

button.innerText =
"Sent!";

button.disabled = true;

setTimeout(()=>{

button.innerText =
original;

button.disabled = false;

},1500);

form.reset();

updatePrice();

resetStars();

}catch{

button.innerText =
"Error";

setTimeout(()=>{

button.innerText =
original;

},1500);

}

}

/* =========================
   REQUEST FORM
========================= */

const orderForm =
document.getElementById(
"orderForm"
);

if(orderForm){

orderForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

saveRequest();

await sendForm(
orderForm,
orderForm.querySelector(
"button"
)
);

});

}

/* =========================
   FEEDBACK FORM
========================= */

const feedbackForm =
document.getElementById(
"feedbackForm"
);

if(feedbackForm){

feedbackForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

saveFeedback();

await sendForm(
feedbackForm,
feedbackForm.querySelector(
"button"
)
);

});

}

/* =========================
   STAR RATING
========================= */

const stars =
document.querySelectorAll(
".half-star, .full-star"
);

const ratingValue =
document.getElementById(
"ratingValue"
);

let currentRating = 0;

stars.forEach(star=>{

star.addEventListener(
"click",
()=>{

currentRating =
Number(
star.dataset.value
);

ratingValue.value =
`${currentRating} Stars`;

updateStars();

});

});

function updateStars(){

stars.forEach(star=>{

const value =
Number(
star.dataset.value
);

if(value <= currentRating){

star.classList.add(
"active-star"
);

}else{

star.classList.remove(
"active-star"
);

}

});

}

function resetStars(){

currentRating = 0;

ratingValue.value =
"0 Stars";

stars.forEach(star=>{

star.classList.remove(
"active-star"
);

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

scrollAmount += .4;

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
