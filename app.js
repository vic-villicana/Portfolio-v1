const express = require("express"),
      compression = require('compression'),
      helmet = require('helmet'),
      app     = express(),
      https = require('https'),
      fs = require('fs'),
      {check, validationResult} = require('express-validator'),
      bodyParser = require("body-parser"),
      debug = require('debug')('incoming'),
      listen = require('debug')('http'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      flash = require("connect-flash"),
 
      createMessage = require('./public/js/createMessages.js')


app.use(compression());
app.use(helmet());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended:true}));

// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/portfolio", {useNewUrlParser:true});

//passport authentication
app.use(require("express-session")({
  secret:"Once again I shall prevail.",
  resave:false,
  saveUninitialized:false
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res)=>{
  res.render("home")
});

app.get("/projectipsy", (req, res)=>{
  res.render("projectipsy");
})

app.get("/projectdzul", (req,res)=>{
  res.render("projectdzul");
})

app.get("/projectjuicy", (req, res)=>{
  res.render("projectjuicy");
});

app.get("/contact", (req, res)=>{
  res.render("contact");
})

app.get("/thankyou", (req,res)=>{
  res.render("thankyou")
  
})



app.post("/incoming", [
  check('name', 'name must have more than 3 characters').not().isEmpty().isLength({min:3}).trim().escape(),
  check('email', 'Email address must be a valid email address').isEmail().not().isEmpty(),
  check('message').not().isEmpty(),
  ], 
  (req,res)=>{  
  
  const error = validationResult(req);
    if(!error.isEmpty()){
      req.flash("error", "please input info in right format")
      res.render('contact', {errors:error})
    }else{
      let name = req.body.name;
      let email = req.body.email;
      let message = req.body.message;
      let newMessage = {name, email, message};
      createMessage(newMessage)
      // message.create(newMessage, (err, newCreated)=>{
      //   if(err){
      //     debug('post error:' + err);
      //   }else {
      //     res.redirect("/thankyou");
      //   }
      // });
      
    }  
});


app.get("/incoming/:id", (req, res)=>{
  message.findById(req.params.id, (err, foundMessage)=>{
    if(err){
      debug('retrieve error:' + err);
    }
    else {
      res.render("show", {messages: foundMessage})
    }
  })
})

app.get("/incoming", isloggedIn, (req, res)=>{
  message.find({}, (err, newMessages)=>{
    if(err){
      debug('display error:' + err);
    }else{
      res.render('incoming', {messages:newMessages})
    }
  });
});
//auth routes
app.get("/register", (req, res)=>{
  res.render("register");
})

app.post("/register", (req, res)=>{
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, (err, user)=>{
    if(err){
      debug('register error:' + err);
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

// let options = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem'),
//   passphrase: "shlemmies",
// }

const Port = process.env.PORT || 8081;

// https.createServer(options, app, (req, res)=>{
//   res.writeHead(200);
// })

app.listen(Port);