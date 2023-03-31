const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomAPIError } = require("../errors/custom-error");
const { apiResponse } = require("../utils/response");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json(apiResponse(201, tasks));
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(apiResponse(201, task));
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    return next(createCustomAPIError(`No task with Id ${taskId}`, 400));
  }

  res.status(200).json(apiResponse(201, task));
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomAPIError(`No task with Id ${taskId}`, 400));
  }
  res.status(200).json(apiResponse(200, task));
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomAPIError(`No task with Id ${taskId}`, 400));
  }
  res.status(200).json(apiResponse(200, task));
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
