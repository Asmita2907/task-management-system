const Task = require("../models/Task");

// CREATE TASK
const handleCreateTaskController = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).send({ success: true, message: "Task created successfully", task: savedTask });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error creating task", error: error.message });
  }
};

// GET ALL TASKS
const handleTaskListController = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send({ success: true, total: tasks.length, tasks });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching tasks", error: error.message });
  }
};

// DELETE TASK
const handleTaskDeleteController = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send({ success: false, message: "Task not found" });
    res.status(200).send({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting task", error: error.message });
  }
};

// UPDATE TASK
const handleTaskUpdateController = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).send({ success: false, message: "Task not found" });
    res.status(200).send({ success: true, message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating task", error: error.message });
  }
};

// COMPLETE TASK
const handleTaskCompleteController = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
    if (!task) return res.status(404).send({ success: false, message: "Task not found" });
    res.status(200).send({ success: true, message: "Task marked as completed", task });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error completing task", error: error.message });
  }
};

module.exports = {
  handleCreateTaskController,
  handleTaskListController,
  handleTaskDeleteController,
  handleTaskUpdateController,
  handleTaskCompleteController,
};