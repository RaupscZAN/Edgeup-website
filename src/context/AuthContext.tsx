import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@edgeup.ai',
  role: 'admin'
};

// Demo credentials for login
const DEMO_EMAIL = 'admin@edgeup.ai';
const DEMO_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved auth state on mount
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a demo authentication - in a real app, you would call an API
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setCurrentUser(DEMO_USER);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(DEMO_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};