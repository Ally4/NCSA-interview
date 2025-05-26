import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [interactions, setInteractions] = useState([]);
  useEffect(() => {
    if (token) {
      axios.get('https://ncsa-interview.fly.dev//api/auth/interactions', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => setInteractions(r.data))
        .catch(console.error);
    }
  }, [token]);
  const login = (tk, un) => {
    localStorage.setItem('token', tk);
    localStorage.setItem('username', un);
    setToken(tk);
    setUsername(un);
  };
  const logout = () => { localStorage.clear(); setToken(null); setUsername(null); };
  return (
    <AuthContext.Provider value={{ token, username, interactions, setInteractions: setInteractions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}