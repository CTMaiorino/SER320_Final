var express = require("express");
var coursesRouter = express.Router();
const mongoose = require("mongoose");
let Courses = require("../models/courses");

/* GET home page. */
coursesRouter
  .route("/")
  .get((req, res, next) => {
    Courses.find({}, (err, courses) => {
      if (err) throw err;
      //
      //get each course, convert to json, and send in response.
      console.log(courses);
      res.json(courses);
    });
  })
  .post((req, res, next) => {
    Courses.create(req.body, (err, course) => {
      if (err) throw err;
      //
      console.log("course created");
      var id = course._id;
      res.writeHead(200, { "Content-Type": "text-plain" });
      // Send reply with the new course id
      res.end("Added the course with the id: " + id);
    });
  });

coursesRouter
  .route("/:courseId") //courseId router
  .get((req, res, next) => {
    Courses.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      //
      res.json(course); // convert to Json and return in res
    });
  })
  .put((req, res, next) => {
    Courses.findByIdAndUpdate(req.params.courseId, req.body, function(
      err,
      course
    ) {
      if (err) throw err;
      //
      course.save();
      res.end("Course with id " + req.params.courseId + " was updated");
    });
  })
  .delete((req, res, next) => {
    Courses.findByIdAndRemove(req.params.courseId, (err, course) => {
      if (err) throw err;
      //
      res.json(course);
    });
  });

module.exports = coursesRouter;
