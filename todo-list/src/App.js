import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
   <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>

   </Router>
  );
}

export default App;
