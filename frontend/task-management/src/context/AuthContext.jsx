import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {

  const response = await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Login failed");
  }

  const userData = {
    name:data.user.name,
    email:data.user.email
  };

  setUser(userData);
  setIsAuthenticated(true);

  localStorage.setItem("user", JSON.stringify(userData));

  return data;
};


  const signup = async (name, email, password) => {

  const response = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  const userData = {
    name: name,
    email: email
  };

  setUser(userData);
  setIsAuthenticated(true);

  localStorage.setItem("user", JSON.stringify(userData));

  return data;
};


  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
