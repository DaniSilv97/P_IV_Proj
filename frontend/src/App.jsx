import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import { OpenRoute, ProtectedRoute, PublicRoute } from './components/RouteAuth';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import FieldsLayout from './views/MyFields/FieldsLayout';
import MyFields from './views/MyFields';
import MyField from './views/MyField';

function App() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/session', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          console.log('User is logged in:', data);
        } else {
          console.log('User not logged in');
        }
      } catch (err) {
        console.error('Session check failed:', err);
      }
    };

    checkSession();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <OpenRoute>
          <Home />
        </OpenRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
        
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      <Route path="/fields" element={
        <ProtectedRoute>
          <FieldsLayout />
        </ProtectedRoute>
        
      } >
        <Route index element={
          <ProtectedRoute>
            <MyFields />
          </ProtectedRoute>
          
        } /> 
        <Route path=":id" element={
          <ProtectedRoute>
            <MyField />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
