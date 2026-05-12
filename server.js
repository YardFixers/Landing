require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const DATABASE = "database.json";

if(!fs.existsSync(DATABASE)){
  fs.writeFileSync(DATABASE, JSON.stringify({
    visitors: [],
    orders: [],
    users: []
  }, null, 2));
}

function readDB(){
  return JSON.parse(fs.readFileSync(DATABASE));
}

function writeDB(data){
  fs.writeFileSync(DATABASE, JSON.stringify(data, null, 2));
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* TRACK VISITOR */

app.post("/track-visit", (req,res)=>{

  const db = readDB();

  const visit = {
    id: uuidv4(),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    screenWidth: req.body.screenWidth,
    screenHeight: req.body.screenHeight,
    timeSpent: req.body.timeSpent,
    timestamp: new Date()
  };

  db.visitors.push(visit);

  writeDB(db);

  res.json({success:true});

});

/* ORDER SUBMISSION */

app.post("/submit-order", async(req,res)=>{

  try{

    const db = readDB();

    const order = {
      id: uuidv4(),
      ...req.body,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      timestamp: new Date()
    };

    db.orders.push(order);

    writeDB(db);

    const html = `
      <h2>New YardFixers Order</h2>

      <p><strong>Name:</strong> ${req.body.name}</p>

      <p><strong>Email:</strong> ${req.body.email}</p>

      <p><strong>Phone:</strong> ${req.body.phone}</p>

      <p><strong>Area:</strong> ${req.body.area}</p>

      <p><strong>Service:</strong> ${req.body.service}</p>

      <p><strong>Yard Size:</strong> ${req.body.yardSize}</p>

      <p><strong>Estimated Price:</strong> ${req.body.price}</p>

      <p><strong>Message:</strong> ${req.body.message}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: "New YardFixers Order",
      html
    });

    res.json({
      success:true
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      success:false
    });

  }

});

/* GET DASHBOARD DATA */

app.get("/dashboard-data",(req,res)=>{

  const db = readDB();

  res.json(db);

});

app.listen(process.env.PORT || 3000, ()=>{

  console.log("Server running");

});
