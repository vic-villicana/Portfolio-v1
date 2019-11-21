const express = require("express"),
      app     = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("home")
});

app.get("/projects", (req, res)=>{
  res.render("projects");
})

app.get("/contact", (req, res)=>{
  res.render("contact");
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("server started")
});