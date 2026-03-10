const Task = require("../models/Task");

// Create Task
const handleCreateTaskController = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    console.log(savedTask);

    res.status(201).send({
      success: true,
      message: "Task created successfully",
      task: savedTask
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating task",
      error
    });
  }
};

// Get All Tasks
const handleTaskListController = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).send({
      success: true,
      total: tasks.length,
      tasks
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching tasks",
      error
    });
  }
};

// Delete Task
const handleTaskDeleteController = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body.id);

    res.status(200).send({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting task",
      error
    });
  }
};


// Update Task
const handleTaskUpdateController = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating task",
      error
    });
  }
};


// Mark Task Completed
const handleTaskCompleteController = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.body.id,
      { status: "completed" },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Task marked as completed",
      task
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error completing task",
      error
    });
  }
};


module.exports = {
  handleCreateTaskController,
  handleTaskListController,
  handleTaskDeleteController,
  handleTaskUpdateController,
  handleTaskCompleteController
};