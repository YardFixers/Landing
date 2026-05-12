/* PHONE FORMAT */

const phone =
document.getElementById("phone");

phone.addEventListener("input",(e)=>{

let input =
e.target.value.replace(/\D/g,'');

if(input.startsWith("1")){
input=input.substring(1);
}

input=input.substring(0,10);

let formatted="1+ ";

if(input.length>0){
formatted += "(" +
input.substring(0,3);
}

if(input.length>=4){
formatted += ") " +
input.substring(3,6);
}

if(input.length>=7){
formatted += "-" +
input.substring(6,10);
}

e.target.value=formatted;

});

/* TRACK USER */

const startTime=Date.now();

window.addEventListener(
"beforeunload",
async()=>{

const timeSpent=
Math.floor(
(Date.now()-startTime)/1000
);

await fetch("/track",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

timeSpent,

width:window.innerWidth,

height:window.innerHeight

})

});

});

/* SUBMIT FORM */

const form =
document.getElementById(
"orderForm"
);

form.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const data={

name:form.name.value,

email:form.email.value,

phone:form.phone.value,

area:form.area.value,

service:form.service.value,

yardSize:form.yardSize.value,

message:form.message.value

};

const response=
await fetch("/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result=
await response.json();

if(result.success){

window.location.href=
"thankyou.html";

}

});
