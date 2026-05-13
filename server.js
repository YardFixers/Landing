const express = require("express");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB = "./database.json";

/* =========================
DATABASE
========================= */

function readDB(){

  return JSON.parse(
    fs.readFileSync(DB)
  );

}

function writeDB(data){

  fs.writeFileSync(
    DB,
    JSON.stringify(data, null, 2)
  );

}

/* =========================
EMAIL
========================= */

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{

user:"yardfixers00@gmail.com",

pass:"PUT_YOUR_GOOGLE_APP_PASSWORD_HERE"

}

});

/* =========================
TRACK VISITS
========================= */

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

/* =========================
SIGNUP
========================= */

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

/* =========================
LOGIN
========================= */

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

/* =========================
ORDER
========================= */

app.post("/order",async(req,res)=>{

const db = readDB();

let user =
db.users.find(
u=>u.email===req.body.customer
);

/* POINTS SYSTEM */

if(user){

user.points += 10;

}

/* ORDER */

const order = {

...req.body,

status:"Pending Confirmation",

ip:
req.headers["x-forwarded-for"] ||
req.socket.remoteAddress,

time:new Date()

};

db.orders.push(order);

writeDB(db);

/* EMAIL */

const html = `

<h2>
New YardFixers Order
</h2>

<p>
<strong>Name:</strong>
${req.body.name}
</p>

<p>
<strong>Email:</strong>
${req.body.email}
</p>

<p>
<strong>Phone:</strong>
${req.body.phone}
</p>

<p>
<strong>Area:</strong>
${req.body.area}
</p>

<p>
<strong>Services:</strong>
${req.body.services}
</p>

<p>
<strong>Yard Size:</strong>
${req.body.yardSize}
</p>

<p>
<strong>Message:</strong>
${req.body.message}
</p>

`;

try{

await transporter.sendMail({

from:"yardfixers00@gmail.com",

to:"yardfixers00@gmail.com",

subject:"New YardFixers Order",

html

});

}catch(err){

console.log(err);

}

res.json({

success:true,

points:
user
? user.points
:0

});

});

/* =========================
DASHBOARD
========================= */

app.get("/dashboard",(req,res)=>{

const db = readDB();

res.json(db);

});

/* =========================
START SERVER
========================= */

app.listen(3000, ()=>{

console.log("Running");

});
