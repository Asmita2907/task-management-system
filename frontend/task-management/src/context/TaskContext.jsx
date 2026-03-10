import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initialTasks = [
      {
        id: 1,
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the new feature including API endpoints and user guide',
        status: 'pending',
        priority: 'high',
        dueDate: '2026-03-15',
        createdDate: '2026-03-01',
        assignedTo: 'John Doe'
      },
      {
        id: 2,
        title: 'Review pull requests',
        description: 'Review and approve pending pull requests from the team',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2026-03-12',
        createdDate: '2026-03-02',
        assignedTo: 'Jane Smith'
      },
      {
        id: 3,
        title: 'Update dependencies',
        description: 'Update all npm packages to their latest stable versions',
        status: 'completed',
        priority: 'low',
        dueDate: '2026-03-20',
        createdDate: '2026-03-03',
        assignedTo: 'Mike Johnson'
      },
      {
        id: 4,
        title: 'Fix login bug',
        description: 'Resolve the authentication issue reported by users',
        status: 'pending',
        priority: 'high',
        dueDate: '2026-03-10',
        createdDate: '2026-03-04',
        assignedTo: 'Sarah Wilson'
      },
      {
        id: 5,
        title: 'Write unit tests',
        description: 'Create unit tests for the new API endpoints',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2026-03-18',
        createdDate: '2026-03-05',
        assignedTo: 'Tom Brown'
      },
      {
        id: 6,
        title: 'Design new landing page',
        description: 'Create mockups and implement the new landing page design',
        status: 'pending',
        priority: 'medium',
        dueDate: '2026-03-25',
        createdDate: '2026-03-06',
        assignedTo: 'Emily Davis'
      }
    ];
    setTasks(initialTasks);
  }, []);

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;

    return {
      total,
      completed,
      inProgress,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
