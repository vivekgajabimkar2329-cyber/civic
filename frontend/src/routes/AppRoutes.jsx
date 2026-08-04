import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
  );
}
