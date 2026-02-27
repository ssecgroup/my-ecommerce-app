import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setCurrentUser(model);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
    setCurrentUser(authData.record);
    return authData;
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
  };

  const signup = async (data) => {
    const record = await pb.collection('users').create(data, { $autoCancel: false });
    return record;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signup, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
