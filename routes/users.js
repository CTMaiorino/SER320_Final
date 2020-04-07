var express = require("express");
var usersRouter = express.Router();
const mongoose = require("mongoose");
let users = require("../models/users");

/* GET home page. */
usersRouter
  .route("/")
  .get((req, res, next) => {
    users.find({}, (err, user) => {
      if (err) throw err;
      //
      //get each user, convert to json, and send in response.
      res.json(user);
    });
  })
  .post((req, res, next) => {
    users.create(req.body, (err, user) => {
      if (err) throw err;
      //
      console.log("user created");
      var id = user._id;
      res.writeHead(200, { "Content-Type": "text-plain" });
      //send reply with the new user id
      res.end("Added the user with id:" + id);
    });
  });

usersRouter
  .route("/:userId") //userId router
  .get((req, res, next) => {
    users.findById(req.params.userId, (err, user) => {
      if (err) throw err;
      //
      res.json(user);
    });
  })
  .put((req, res, next) => {
    users.findByIdAndUpdate(req.params.userId, req.body, function(err, user) {
      if (err) throw err;
      //
      user.save();
      res.end("User with id " + req.params.userId + " was updated");
    });
  })
  .delete((req, res, next) => {
    users.findByIdAndRemove(req.params.userId, (err, resp) => {
      if (err) throw err;
      //
      res.json(resp);
    });
  });

module.exports = usersRouter;
