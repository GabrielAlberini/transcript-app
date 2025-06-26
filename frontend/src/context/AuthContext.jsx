// AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || null));

  useEffect(() => {
    localStorage.setItem("token", token || "");
    localStorage.setItem("user", user ? JSON.stringify(user) : "");
  }, [token, user]);

  const login = ({ email, token }) => {
    setToken(token);
    setUser(email);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
