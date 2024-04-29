const express = require("express");
const router = express.Router();

const {deleteTask,createTask,getTaskByID,getTasks,updateTask} = require("../controllers/tasksControllers");

function f(req,res,next){
    console.log("hello world");
    next();
}

router.route("/").get(f,getTasks).post(createTask);
router.route("/:id").get(getTaskByID).patch(updateTask).delete(deleteTask);

module.exports = router;