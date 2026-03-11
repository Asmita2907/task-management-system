// src/components/TaskCard.jsx
import React from "react";

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => onToggleComplete(task._id)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div>
          <div
            className={`font-medium text-gray-900 ${
              task.status === "completed" ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </div>
          <div className="text-sm text-gray-500">{task.description}</div>
          <div className="text-xs mt-1">
            Status:{" "}
            <span
              className={`${
                task.status === "completed"
                  ? "text-green-600"
                  : task.status === "in-progress"
                  ? "text-yellow-600"
                  : "text-gray-600"
              } font-semibold`}
            >
              {task.status}
            </span>{" "}
            | Priority: {task.priority} | Due:{" "}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;