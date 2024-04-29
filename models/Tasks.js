const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name of task"],
        trim: true,
        maxLength: [20," name must be less than 20 "],
    },
    completed:{
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = mongoose.model("Task",TaskSchema);