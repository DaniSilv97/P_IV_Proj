import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import FieldsLayout from './views/MyFields/FieldsLayout';
import MyFields from './views/MyFields';
import MyField from './views/MyField';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/fields" element={<FieldsLayout />}>
        <Route index element={<MyFields />} /> 
        <Route path=":id" element={<MyField />} />
      </Route>
    </Routes>
  );
}

export default App;
