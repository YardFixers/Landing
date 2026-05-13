// FILE NAME: script.js

/* PRICE CALCULATOR */

const serviceCheckboxes =
document.querySelectorAll(
'.multi-services input[type="checkbox"]'
);

const yardSizeSelect =
document.querySelector(
'select[name="yardSize"]'
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

/* MULTIPLIER */

let multiplier = 1;

const yardSize =
yardSizeSelect.value;

if(
yardSize.includes("Small")
){

multiplier = 1;

}

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

/* FINAL PRICE */

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

/* PHONE FORMAT */

const phone =
document.getElementById(
"phone"
);

phone.addEventListener(
"input",
e=>{

let input =
e.target.value.replace(/\D/g,'');

if(input.length > 11){

input =
input.slice(0,11);

}

let formatted =
"";

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

/* FORM */

const orderForm =
document.getElementById(
"orderForm"
);

orderForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

alert(
"Request Sent!"
);

orderForm.reset();

updatePrice();

});

/* FEEDBACK */

const feedbackForm =
document.getElementById(
"feedbackForm"
);

feedbackForm.addEventListener(
"submit",
async e=>{

e.preventDefault();

alert(
"Feedback Sent!"
);

feedbackForm.reset();

});
