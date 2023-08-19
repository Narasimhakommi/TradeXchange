//require modules
const express = require("express");
const morgan = require("morgan");
const tradeRoutes = require("./routes/tradeRoutes");
const methodOverride = require("method-override");

//create app
const app = express();

//configure app
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

//mount middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

//setup routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/about',(req,res)=>{
  res.render('about');
});

app.get('/contact',(req,res)=>{
  res.render('contactUs');
});


app.use("/trades", tradeRoutes);



app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
    err.message = "Internal server error.";
  }
  res.status(err.status);
  res.render("error", { error: err });
});

//start the server
app.listen(port, host, () => {
  console.log("Server is Running on port", port);
});
