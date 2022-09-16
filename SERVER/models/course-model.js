const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    id:{type:String},
    title:{
        type:String,
        requried:true,
    },
    description:{
        type:String,
        requried:true,
    },
    price:{
        type:Number,
        required: true,
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    },
    student:{
        type:[String],
        default:[],
    },
});
const Course = mongoose.model("Course",courseSchema);
module.exports = Course;