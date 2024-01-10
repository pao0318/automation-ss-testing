import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Homepage from './components/Home/HomePage.js';
import Signup from './components/SignUp/SignUp.js';
import './App.css';

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
        <header className="App-header">
          <h1>React Login App</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                {loggedIn ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/signup">Signup</Link>
                    </li>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </header>

        <main className="App-content">
          <Routes>
            <Route path="/" element={loggedIn ? <Homepage onLogout={() => setLoggedIn(false)} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

 
