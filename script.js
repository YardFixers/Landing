// FILE NAME: script.js

/* PRICE CALCULATOR */

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

let multiplier = 1;

const yardSize =
yardSizeSelect.value;

if(yardSize.includes("Medium")){
multiplier = 2;
}

if(yardSize.includes("Large")){
multiplier = 3;
}

let finalPrice =
basePrice * multiplier;

let discountText = "";

if(selectedServices.length === 3){

finalPrice =
finalPrice * 0.85;

discountText =
" • 15% OFF Applied";

}

finalPrice =
Math.round(finalPrice);

totalPrice.innerText =
`$${finalPrice}${discountText}`;

}

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

updatePrice();

/* PHONE FORMAT */

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
input = input.slice(0,11);
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

/* NAVBAR HIDE */

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

/* FORM SUBMIT */

async function sendForm(
form,
button
){

const originalText =
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
originalText;

button.disabled = false;

},1500);

form.reset();

updatePrice();

}catch(err){

button.innerText =
"Error";

setTimeout(()=>{

button.innerText =
originalText;

},1500);

}

}

const orderForm =
document.getElementById(
"orderForm"
);

if(orderForm){

orderForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

const button =
orderForm.querySelector(
"button"
);

await sendForm(
orderForm,
button
);

});

}

const feedbackForm =
document.getElementById(
"feedbackForm"
);

if(feedbackForm){

feedbackForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

const button =
feedbackForm.querySelector(
"button"
);

await sendForm(
feedbackForm,
button
);

});

}

/* STARS */

const stars =
document.querySelectorAll(
".rating-star"
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
star.dataset.value;

ratingValue.value =
currentRating;

updateStars();

});

});

function updateStars(){

stars.forEach(star=>{

const value =
Number(star.dataset.value);

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

/* AUTO REVIEWS */

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
