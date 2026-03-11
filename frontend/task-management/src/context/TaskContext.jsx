import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within a TaskProvider");
  return context;
};

const API_BASE = "http://localhost:5000/task";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setTasks([]);
        return;
      }

      const user = JSON.parse(storedUser);
      setLoading(true); // start loading

      const res = await axios.get(`${API_BASE}/${user.id}`);
      if (res.data && res.data.tasks) setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (newTask) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);

      const res = await axios.post(`${API_BASE}/addtask`, { ...newTask, userId: user.id });
      if (res.data && res.data.task) setTasks((prev) => [...prev, res.data.task]);
    } catch (err) {
      console.error(err);
    }
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, updatedTask);
      if (res.data && res.data.task)
        setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle complete
  const toggleTaskComplete = async (id) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}/complete`);
      if (res.data && res.data.task)
        setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Task stats
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

  // ✅ Clear tasks on logout
  const clearTasks = () => setTasks([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,        // expose loading state
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        getTaskStats,
        setTasks,       // optional: direct setter
        clearTasks,     // to clear tasks on logout
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};