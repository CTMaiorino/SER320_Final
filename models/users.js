var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require("./courses");
var userSchema = new Schema({
    //permissions would either be student or prof. Used for determining which front end to load
    id: {
        type: Number,
        required : true,
        unique: true
        
    },
    isProf: {
        type: Boolean,
        required : true
        
    },
	Username : { 
			type : String,
            required: true,
            unique: true
			},
	Password : {
			type : String,
			required : true
    },
    firstName: {
        type : String,
        required: true
    },
    lastName: {
        type : String,
        required: true
    },

    //list of students associated with that user. Should be null if user is a student
    StudentList: [{type: Schema.ObjectId, ref: 'User'}],
    RegisteredCourses: [{type: Schema.ObjectId, ref: 'Course'}]

    
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;