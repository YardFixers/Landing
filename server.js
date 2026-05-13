const express = require("express");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB = "./database.json";

/* DATABASE */

function readDB(){

return JSON.parse(
fs.readFileSync(DB)
);

}

function writeDB(data){

fs.writeFileSync(
DB,
JSON.stringify(data,null,2)
);

}

/* EMAIL */

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{

user:"yardfixers00@gmail.com",

pass:"PUT_YOUR_GOOGLE_APP_PASSWORD_HERE"

}

});

/* TRACK USERS */

app.post("/track",(req,res)=>{

const db = readDB();

db.visitors.push({

ip:
req.headers["x-forwarded-for"] ||
req.socket.remoteAddress,

width:req.body.width,

height:req.body.height,

timeSpent:req.body.timeSpent,

time:new Date()

});

writeDB(db);

res.json({
success:true
});

});

/* SIGNUP */

app.post("/signup",(req,res)=>{

const db = readDB();

const exists =
db.users.find(
u=>u.email===req.body.email
);

if(exists){

return res.json({

success:false,
message:"Account Already Exists"

});

}

const newUser = {

email:req.body.email,
password:req.body.password,
points:0

};

db.users.push(newUser);

writeDB(db);

res.json({

success:true,
user:newUser

});

});

/* LOGIN */

app.post("/login",(req,res)=>{

const db = readDB();

const user =
db.users.find(

u=>

u.email===req.body.email &&

u.password===req.body.password

);

if(user){

res.json({

success:true,
user

});

}else{

res.json({
success:false
});

}

});

/* REQUEST */

app.post("/request",async(req,res)=>{

const db = readDB();

db.orders.push(req.body);

writeDB(db);

const html = `

<h2>REQUEST</h2>

<p>
<b>Name:</b>
${req.body.name}
</p>

<p>
<b>Gmail:</b>
${req.body.email}
</p>

<p>
<b>Phone:</b>
${req.body.phone}
</p>

<p>
<b>Area:</b>
${req.body.area}
</p>

<p>
<b>Services:</b>
${req.body.services}
</p>

<p>
<b>Yard Size:</b>
${req.body.yardSize}
</p>

<p>
<b>Estimated Price:</b>
${req.body.price}
</p>

<p>
<b>Message:</b>
${req.body.message}
</p>

`;

try{

await transporter.sendMail({

from:"yardfixers00@gmail.com",

to:"yardfixers00@gmail.com",

subject:"REQUEST",

html

});

}catch(err){

console.log(err);

}

res.json({
success:true
});

});

/* FEEDBACK */

app.post("/feedback",async(req,res)=>{

const db = readDB();

db.feedback.push(req.body);

writeDB(db);

const html = `

<h2>FEEDBACK</h2>

<p>
<b>Name:</b>
${req.body.name}
</p>

<p>
<b>Gmail:</b>
${req.body.email}
</p>

<p>
<b>Feedback:</b>
${req.body.message}
</p>

`;

try{

await transporter.sendMail({

from:"yardfixers00@gmail.com",

to:"yardfixers00@gmail.com",

subject:"FEEDBACK",

html

});

}catch(err){

console.log(err);

}

res.json({
success:true
});

});

/* DASHBOARD */

app.get("/dashboard-data",(req,res)=>{

const db = readDB();

res.json(db);

});

/* START */

app.listen(3000,()=>{

console.log("Running On 3000");

});
