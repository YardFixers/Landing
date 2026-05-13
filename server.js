const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend =
new Resend(
process.env.RESEND_API_KEY
);

/* =========================
   ACCEPT REQUEST
========================= */

app.post(
"/accept",
async(req,res)=>{

try{

const {
email,
name,
date,
time
} = req.body;

await resend.emails.send({

from:
"YardFixers <onboarding@resend.dev>",

to:
email,

subject:
"Your YardFixers Request Was Accepted",

html:
`
<div style="
font-family:Arial;
padding:20px;
line-height:1.8;
">

<h2>
Hey ${name},
</h2>

<p>
Good news —
we accepted your request.
</p>

<p>
We currently have you scheduled for:
</p>

<h3>
${date || "Your requested date"}
<br>
${time || ""}
</h3>

<p>
Thanks for choosing YardFixers.
We appreciate the support.
</p>

<p>
- Ellison & Sawyer
</p>

</div>
`

});

res.json({
success:true
});

}catch(err){

res.json({
success:false
});

}

});

/* =========================
   REJECT REQUEST
========================= */

app.post(
"/reject",
async(req,res)=>{

try{

const {
email,
name
} = req.body;

await resend.emails.send({

from:
"YardFixers <onboarding@resend.dev>",

to:
email,

subject:
"Update About Your YardFixers Request",

html:
`
<div style="
font-family:Arial;
padding:20px;
line-height:1.8;
">

<h2>
Hey ${name},
</h2>

<p>
Thanks for reaching out to YardFixers.
</p>

<p>
Unfortunately,
we aren't available for that request right now.
</p>

<p>
We really appreciate you contacting us
and hope we can help in the future.
</p>

<p>
- Ellison & Sawyer
</p>

</div>
`

});

res.json({
success:true
});

}catch(err){

res.json({
success:false
});

}

});

app.listen(
3000,
()=>{

console.log(
"Server running on port 3000"
);

});
