import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user session
    try {
      const storedUser = authService.getCurrentUser();
      setUser(storedUser);
    } catch (e) {
      console.error('Failed to load initial user session', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await authService.login(email, password);
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.name}!`);
      return res.user;
    } catch (error) {
      toast.error(error.message || 'Login failed.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await authService.register(userData);
      setUser(res.user);
      toast.success('Account created! Welcome to Fuse.');
      return res.user;
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success('Signed out successfully.');
    } catch (error) {
      toast.error('Error signing out.');
    }
  };

  const updateUser = (fields) => {
    const updated = authService.updateCurrentUser(fields);
    setUser(updated);
    toast.success('Profile updated successfully!');
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
