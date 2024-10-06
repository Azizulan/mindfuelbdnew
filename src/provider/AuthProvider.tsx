"use client";

import { AuthContext } from "@/context";
import React, { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Centralize login functionality
  const login = (accessToken: string, expiresAt: string) => {
    localStorage.setItem("MindFuel_accessToken", accessToken);
    localStorage.setItem("MindFuel_expiresAt", expiresAt);
    setIsAuthenticated(true);
  };

  // Centralize logout functionality
  const logout = () => {
    localStorage.removeItem("MindFuel_accessToken");
    localStorage.removeItem("MindFuel_expiresAt");
    setIsAuthenticated(false);
  };

  // Check if the user is authenticated (on page load or refresh)
  const checkAuth = () => {
    const accessToken = localStorage.getItem("MindFuel_accessToken");
    const expiresAt = localStorage.getItem("MindFuel_expiresAt");

    if (accessToken && expiresAt) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expiresAt).getTime();

      if (currentTime < expirationTime) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  // Run checkAuth on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

