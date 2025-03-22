import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: string | null;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      setUser(storedUser);
    };
    checkAuth();
  }, []);

  const login = async (username: string) => {
    // Store the username in AsyncStorage and update the user state
    await AsyncStorage.setItem("user", username);
    setUser(username);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};