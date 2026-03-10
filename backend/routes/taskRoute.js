
const { 
  handleCreateTaskController,
  handleTaskListController,
 
  handleTaskDeleteController,
  handleTaskUpdateController,
  handleTaskCompleteController
} = require("../controllers/taskController");

const express = require("express");

// Route → connects URL to controller
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Routing on task route page");
});


// create task
router.post("/addtask", handleCreateTaskController);

//get all task
router.get("/gettasks", handleTaskListController);
// delete task
router.delete("/deletetask", handleTaskDeleteController);

// update task
router.put("/updatetask", handleTaskUpdateController);

// mark task completed
router.put("/completetask", handleTaskCompleteController);



module.exports = router;