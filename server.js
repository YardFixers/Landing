const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { Resend } = require("resend");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
extended:true
}));

/* =========================
   RESEND
========================= */

const resend =
new Resend(
process.env.RESEND_API_KEY
);

/* =========================
   FRONTEND WEBSITE
========================= */

app.use(
express.static(
path.join(__dirname)
)
);

/* =========================
   HOME PAGE
========================= */

app.get(
"/",
(req,res)=>{

res.sendFile(
path.join(
__dirname,
"index.html"
)
);

}
);

/* =========================
   ACCEPT EMAIL
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
${
date || time
?
`Your scheduled service time is:<br><br>
<b>${date || ""}</b><br>
<b>${time || ""}</b>`
:
`We accepted your requested time.`
}
</p>

<p>
Thank you for supporting YardFixers.
We appreciate it a lot.
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

}catch(error){

console.log(error);

res.json({
success:false
});

}

});

/* =========================
   REJECT EMAIL
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
Thank you for reaching out to YardFixers.
</p>

<p>
Unfortunately,
we are unavailable for that request right now.
</p>

<p>
We still really appreciate you contacting us
and hope we can work with you another time.
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

}catch(error){

console.log(error);

res.json({
success:false
});

}

});

/* =========================
   DASHBOARD PAGE
========================= */

app.get(
"/dashboard",
(req,res)=>{

res.sendFile(
path.join(
__dirname,
"dashboard.html"
)
);

}
);

/* =========================
   SERVER
========================= */

const PORT =
process.env.PORT || 3000;

app.listen(
PORT,
()=>{

console.log(
`Server running on port ${PORT}`
);

}
);
