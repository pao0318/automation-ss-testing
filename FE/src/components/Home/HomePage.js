import React from 'react';

const Homepage = ({ onLogout }) => {
  return (
    <div>
      <h2>Welcome to the Homepage!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
