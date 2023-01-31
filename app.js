let myExpress = require("express")
let app = myExpress()
let Users = require("./DB/modules/users")
const nodemailer = require('nodemailer');

require("./DB/db")
app.use(myExpress.json())
// let cors=require("cors")
// app.use(cors())  


// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 462,
//     secure: false, // use SSL // true for 465, false for other ports
//     auth: {
//       user: "viperwanted30@gmail.com", // generated ethereal user
//       pass: "rkqlyyycyuknoyrh", // generated ethereal password
//     },

//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: 'viperwanted30@gmail.com', // sender address
//     to: "sarmadawan35@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }



// Signup wala code 

app.post("/Create-User", async (req, res) => {
  console.log(req.body)
  let email = req.body.email;
  let check = await Users.findOne({ email: email })
  if (check) {
    res.json("email already exsist")
  } else {

    let user = new Users(req.body)
    await user.save()

    // res.json("working")

    // main()


    // main().catch(console.error);

    let check = await Users.findOne({ email: email })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'viperwanted30@gmail.com',
        pass: 'otzltxrwkmammbls'
      }
    });

    const mailOptions = {
      from: 'viperwanted30@gmail.com',
      to: email,
      subject: 'Masoori.com Confirmation',
      html: "<img src='./logo512.png' /> <b>Plz Click on the link to conform your email</b> <br/> http://localhost:3000/" + check.id,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // do something useful


      }
    });


    res.json("Succesfull")
  }

})

// Login wala code 

app.get("/Get-User", async (req, res) => {
  let { email, password } = req.query
  let user = await Users.findOne({
    email: email,
    password: password,
  })
  res.json(user)
})

app.put("/User-Conformation", async (req,res)=>{
  let id=req.body.data
  let user=await Users.findOne({
    id:id
  })
  user.conformation=true;
  await Users.findByIdAndUpdate(id,user)
  res.json("Conform Successfully")
  
})


app.use(myExpress.static(path.join(__dirname, "./Clients/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./Clients/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(8090, () => {
  console.log("server is runing");
})


// otzltxrwkmammbls