let express = require("express"),
      app     = express();
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let message = require("./models/messages");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/portfolio", {useNewUrlParser:true});

app.get("/", (req, res)=>{
  res.render("home")
});

app.get("/projects", (req, res)=>{
  res.render("projects");
})

app.get("/contact", (req, res)=>{
  res.render("contact");
})

app.post("/incoming", (req,res)=>{
  let name = req.body.name;
  let email = req.body.email;
  let letter = req.body.message;
  let newMessage = {name:name, email:email, message:letter};
  message.create(newMessage, (err, newCreaeted)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect("/thankyou")
    }
  }); 
});

app.get("/incoming", (req, res)=>{
  message.find({}, (err, newMessages)=>{
    if(err){
      console.log(err)
    }else{
      res.render('incoming', {messages:newMessages})
    }
  });
});

app.get("/incoming/:id", (req, res)=>{
  res.render("show")
})

app.get("/thankyou", (req,res)=>{
  res.render("thankyou")
  
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("server started")
});