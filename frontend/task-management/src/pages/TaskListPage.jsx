// src/pages/TaskListPage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { useTask } from "../context/TaskContext";

const TaskListPage = () => {
  const { tasks, deleteTask, toggleTaskComplete } = useTask();
  const navigate = useNavigate();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  useEffect(() => setFilteredTasks(tasks), [tasks]);

  useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === "priority") {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === "status") return a.status.localeCompare(b.status);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  const handleEdit = (task) => navigate(`/edit-task/${task._id}`);
  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) deleteTask(taskId);
  };
  const handleToggleComplete = (taskId) => toggleTaskComplete(taskId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <Link
              to="/add-task"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add New Task
            </Link>
          </div>

          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((t) => (
                <TaskCard
                  key={t._id}
                  task={t}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No tasks found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;