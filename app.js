let express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    User = require('./models/users.js'),
    message = require("./models/messages");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/portfolio", {useNewUrlParser:true});

//passport authentication
app.use(require("express-session")({
  secret:"Once again I shall prevail.",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res)=>{
  res.render("home")
});

app.get("/projecttipsy", (req, res)=>{
  res.render("projecttipsy");
})

app.get("/projectdzul", (req,res)=>{
  res.render("projectdzul");
})

app.get("/projectthree", (req, res)=>{
  res.render("projectthree");
});

app.get("/contact", (req, res)=>{
  res.render("contact");
})

app.get("/thankyou", (req,res)=>{
  res.render("thankyou")
  
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

app.get("/incoming", isloggedIn, (req, res)=>{
  message.find({}, (err, newMessages)=>{
    if(err){
      console.log(err)
    }else{
      res.render('incoming', {messages:newMessages})
    }
  });
});

app.get("/incoming/:id", (req, res)=>{
  message.findById(req.params.id, (err, foundMessage)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render("show", {messages: foundMessage})
    }
  })
})

//auth routes
app.get("/register", (req, res)=>{
  res.render("register");
})

app.post("/register", (req, res)=>{
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, (err, user)=>{
    if(err){
      console.log(err);
      res.render("register");
    }
    passport.authenticate("local")(req,res, ()=>{
      res.redirect("/incoming");
    });
  });
});

app.get('/login', (req, res)=>{
  res.render("login");
})

app.post("/login", passport.authenticate("local",
  {
    successRedirect:"/incoming",
    failureRedirect:"/login"
  }), (req, res)=>{
});

app.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/login");
});

function isloggedIn(req,res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("server started")
});


