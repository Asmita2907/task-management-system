const express = require("express");
const {
  handleCreateTaskController,
  handleTaskListController,
  handleTaskDeleteController,
  handleTaskUpdateController,
  handleTaskCompleteController,
} = require("../controllers/taskController");

const router = express.Router();

// Get all tasks for a user
router.get("/:userId", handleTaskListController);

// Add task
router.post("/addtask", handleCreateTaskController);

// Update task
router.put("/:id", handleTaskUpdateController);

// Delete task
router.delete("/:id", handleTaskDeleteController);

// Complete / toggle task
router.put("/:id/complete", handleTaskCompleteController);

module.exports = router;