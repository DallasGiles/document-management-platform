// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const navigate = useNavigate();


 useEffect(() => {
   // Check for user token in local storage
   const token = localStorage.getItem('token');
   if (token) {
     // Fetch user info from token
     // This is a placeholder for actual token decoding and fetching user info
     const fetchedUser = { id: 1, role: 'Foreman' }; // Example user
     setUser(fetchedUser);
   }
 }, []);


 const login = (userData) => {
   setUser(userData);
   localStorage.setItem('token', userData.token);
   navigate('/');
 };


 const logout = () => {
   setUser(null);
   localStorage.removeItem('token');
   navigate('/login');
 };


 return (
   <AuthContext.Provider value={{ user, login, logout }}>
     {children}
   </AuthContext.Provider>
 );
};


export { AuthProvider, AuthContext };
