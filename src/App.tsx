import React, { useEffect } from 'react';
import './App.css';
import api from './services/api';
import Header from './components/Header';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Router } from './Routes';

function App() {

  
  return (
        <BrowserRouter>
        
        <Router />
        </BrowserRouter>

  );
}

export default App;
