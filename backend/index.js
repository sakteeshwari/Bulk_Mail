const express = require('express');
const cors = require('cors');


const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// install nodemailer and get this code from npm nodemailer
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
    user: "sakthijessy26@gmail.com",
    pass: "klie vqic mtgx jhcl",
  },
});

app.post("/mail",function(req,res){
    console.log(req.body.msg)

    var msgz=req.body.msg
    var emailList=req.body.emailList

    new Promise(async function(resolve,reject){
        try{
            for(i=0;i<emailList.length;i++)
                {
                    await transporter.sendMail(
                        {
                            from:"sakthijessy26@gmail.com",
                            to:emailList[i],
                            subject:"this email is from bulkmail project",
                            text:msgz
                        },
                    
                      
                    )
                    console.log("email sent to"+emailList[i])
                }
                res.json(true)
        }
        catch{
            res.json(false)
        }
    
    }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })

    console.log(msgz)
    
})


app.listen(4000, () => {
    console.log("Server Started.....");
});