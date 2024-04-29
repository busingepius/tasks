const Task = require("../models/Tasks");
const {asyncWrapper} = require("../utils/asyncWrapper");
const {BadRequestError} = require("../errors");

const getTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({});
    res.status(200).json({data: tasks});
});

const createTask = asyncWrapper(async (req, res, next) => {

    const task = await Task.create(req.body);
    res.status(201).json({data: task});
});
const getTaskByID = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID});
    if (!task) {
        throw new BadRequestError(`No task with id ${taskID}`);
    }
    res.status(200).json({data: task});
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {params: {id: taskID}, body} = req;
    const task = await Task.findOneAndUpdate({_id: taskID}, body, {runValidators: true, new: true});
    if (!task) {
        throw new BadRequestError(`No task with id ${taskID}`);
    }
    res.status(200).json({data: task});
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID});
    if (!task) {
        throw new BadRequestError(`No task with id ${taskID}`);
    }
    res.status(200).end();
});

module.exports = {getTasks, getTaskByID, updateTask, deleteTask, createTask};