var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var url =
  "mongodb+srv://ctmaiorino:XqwerfvX123@cluster0-iexqv.mongodb.net/WebApp?retryWrites=true&w=majority";
// Connect using mongoose
mongoose.connect(url, { useNewUrlParser: true });
//open a connection and get a db handler
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//routes
var index = require("./routes/index");
var coursesRouter = require("./routes/courses");
var userRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var studentRouter = require("./routes/students");

//Connection URL

//Connect using mongoose
mongoose.connect(url, { useNewUrlParser: true });
//open a connection and get a db handler
var db = mongoose.connection;

//routes
app.use("/", index);
app.use("/courses", coursesRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/students", studentRouter);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
module.exports = app;
