const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const smtpTransport =require('nodemailer-smtp-transport');

require('tls').DEFAULT_MIN_VERSION = 'TLSv1'; //Transport layer security for transferring the gmail
 

app.use(express.json())


let transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port:587,
    auth: {
      user: 'info@halatalents.com',
      pass: 'hala@_*2030halaht'
    },
    tls:{
       rejectUnauthorized: false
    }
}));


transport.use('compile',hbs({
    viewEngine: {
        extName: '.handlebars', //extension name

        layoutsDir: './', //layout directory
        defaultLayout: 'template-1.handlebars', //layout template
    },
    viewPath: './',
    extName: '.handlebars',
}))


transport.verify((error,success)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Server is ready to take message")
    }
})



app.post('/subscribed',(req,res,next)=>{

        const {name,companyName,package,amount} = req.body

        let mail = {
            from:"",
            to:"", //email address of the person whom we want to send the email
            subject:"Successful Subscription",
            template:'template-1',
            attachment:{
            },
            context:{
                name,
                companyName,
                package,
                amount
            }
        }

        transport.sendMail(mail,function(data,err){
            if(err){
                console.log(err);
            }
            else{
                    console.log("Message Sent")
            }

        })
})

//app.listen(5000,()=>{console.log("Server Started")})