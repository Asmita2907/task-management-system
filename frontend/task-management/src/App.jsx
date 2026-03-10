import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TaskListPage from './pages/TaskListPage';
import TaskFormPage from './pages/TaskFormPage';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/edit-task/:id" element={<TaskFormPage />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
