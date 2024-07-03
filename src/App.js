import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/homeLayout';
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage'
import './App.css';

function App() {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Aggiungi altre rotte qui */}
    </Routes>
  </Layout>
  );
}

export default App;
