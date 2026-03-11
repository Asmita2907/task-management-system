import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.user) {
        throw new Error(data.message || "Login failed");
      }

      const userData = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };

      setUser(userData);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(userData));

      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  // SIGNUP
  const signup = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.user) {
        throw new Error(data.message || "Signup failed");
      }

      const userData = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };

      setUser(userData);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(userData));

      return data;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};