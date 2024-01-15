import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TakeScreenShots from '../../Functions/TakeScreenShots';

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCapture = (dataUrl) => {
    console.log("here i come");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      if (!username || !password) {
        setErrorMessage('Please enter both username and password.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setErrorMessage('');
        if (onLogin) {
          onLogin();
        }
        navigate('/home');
      } else {
        const error = await response.json();
        console.error(error.error);
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <TakeScreenShots shouldCapture={true} onCapture={handleCapture}/>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
