import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

const API_BASE = "http://localhost:5000/task";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // GET ALL TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/gettasks`);
      if (res.data && res.data.tasks) {
        setTasks(res.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async (newTask) => {
    try {
      const res = await axios.post(`${API_BASE}/addtask`, newTask);
      if (res.data && res.data.task) {
        setTasks((prev) => [...prev, res.data.task]);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // UPDATE TASK
  const updateTask = async (taskId, updatedTask) => {
    try {
      const res = await axios.put(`${API_BASE}/updatetask/${taskId}`, updatedTask);
      if (res.data && res.data.task) {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? res.data.task : task))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE}/deletetask/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // TOGGLE COMPLETE TASK
  const toggleTaskComplete = async (taskId) => {
    try {
      const res = await axios.put(`${API_BASE}/completetask/${taskId}`);
      if (res.data && res.data.task) {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? res.data.task : task))
        );
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // GET TASK STATS (Dashboard)
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const pending = tasks.filter((t) => t.status === "pending").length;

    return {
      total,
      completed,
      inProgress,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const value = {
    tasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    getTaskStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};