/* NAVBAR */

const navbar =
document.getElementById(
"navbar"
);

let lastScroll = 0;

window.addEventListener(
"scroll",
()=>{

const current =
window.pageYOffset;

if(
current > lastScroll &&
current > 100
){

navbar.classList.add(
"nav-hidden"
);

}else{

navbar.classList.remove(
"nav-hidden"
);

}

lastScroll = current;

});

/* SERVICES */

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

/* PRICE */

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
mowingInput.value = "Yes";

}else{

mowingInput.value = "No";

}

if(washingCheck.checked){

basePrice += 24;
selected++;
washingInput.value = "Yes";

}else{

washingInput.value = "No";

}

if(weedingCheck.checked){

basePrice += 14;
selected++;
weedingInput.value = "Yes";

}else{

weedingInput.value = "No";

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

/* PHONE */

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

/* FORM SUBMIT */

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

/* REQUEST */

const orderForm =
document.getElementById(
"orderForm"
);

if(orderForm){

orderForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

await sendForm(
orderForm,
orderForm.querySelector(
"button"
)
);

});

}

/* FEEDBACK */

const feedbackForm =
document.getElementById(
"feedbackForm"
);

if(feedbackForm){

feedbackForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

await sendForm(
feedbackForm,
feedbackForm.querySelector(
"button"
)
);

});

}

/* STARS */

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

/* REVIEWS */

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
