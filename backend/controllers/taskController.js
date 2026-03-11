const Task = require("../models/Task");

// Get tasks for a user
const handleTaskListController = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add task
const handleCreateTaskController = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task
const handleTaskUpdateController = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task
const handleTaskDeleteController = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Complete / toggle task
const handleTaskCompleteController = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.status = task.status === "completed" ? "pending" : "completed";
    await task.save();
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  handleTaskListController,
  handleCreateTaskController,
  handleTaskUpdateController,
  handleTaskDeleteController,
  handleTaskCompleteController,
};