import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Homepage from './components/Home/HomePage.js';
import Signup from './components/SignUp/SignUp.js';
import './App.css';
import Navbar from './components/Navbar.js';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSignup = (newUsername, newPassword) => {
    setUsers([...users, { username: newUsername, password: newPassword }]);
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={loggedIn} onLogout={handleLogout} />

        <main className="App-content">
          <Routes>
            <Route path="/home" element={loggedIn ? <Homepage onLogout={() => setLoggedIn(false)} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
