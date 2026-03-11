const express = require("express");
const {
  handleCreateTaskController,
  handleTaskListController,
  handleTaskDeleteController,
  handleTaskUpdateController,
  handleTaskCompleteController,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/addtask", handleCreateTaskController);
router.get("/gettasks", handleTaskListController);
router.delete("/deletetask/:id", handleTaskDeleteController);
router.put("/updatetask/:id", handleTaskUpdateController);
router.put("/completetask/:id", handleTaskCompleteController);

module.exports = router;