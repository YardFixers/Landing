const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB = "./database.json";

/* READ DATABASE */

function readDB(){

  return JSON.parse(
    fs.readFileSync(DB)
  );

}

/* WRITE DATABASE */

function writeDB(data){

  fs.writeFileSync(
    DB,
    JSON.stringify(data, null, 2)
  );

}

/* TRACK VISITS */

app.post("/track", (req,res)=>{

  const db = readDB();

  db.visitors.push({

    ip:
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress,

    timeSpent:req.body.timeSpent,

    width:req.body.width,

    height:req.body.height,

    time:new Date()

  });

  writeDB(db);

  res.json({
    success:true
  });

});

/* SUBMIT ORDER */

app.post("/order",(req,res)=>{

  const db = readDB();

  db.orders.push({

    ...req.body,

    status:"Pending Confirmation",

    ip:
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress,

    time:new Date()

  });

  writeDB(db);

  res.json({
    success:true
  });

});

/* DASHBOARD */

app.get("/dashboard",(req,res)=>{

  const db = readDB();

  res.json(db);

});

app.listen(3000, ()=>{

  console.log("Running");

});
