var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  courseId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  semesterOffered: {
    type: String,
    required: true
  }
});

var Courses = mongoose.model("Course", courseSchema);

module.exports = Courses;
