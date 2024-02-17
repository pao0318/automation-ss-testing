import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Homepage from './components/Home/HomePage.js';
import Signup from './components/SignUp/SignUp.js';
import './App.css';
import Navbar from './components/Navbar.js';
import OrderHistory from './components/OrderHistory/OrderHistory.js';
import OrderDetails from './components/OrderHistory/OrderDetails/OrderDetails.js';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders');
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error('Error fetching orders:', data.error);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchData();
  }, []);

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
            <Route path='/orders' element={<OrderHistory orders={orders} />}/>
            <Route path="/order-details/:orderId" element={<OrderDetails orders={orders}/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
