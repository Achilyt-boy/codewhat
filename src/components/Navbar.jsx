import React from 'react';

function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      backgroundColor: '#1e293b', 
      color: '#ffffff' 
    }}>
      <h2 style={{ margin: 0 }}>CodeBridge</h2>
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        gap: '20px', 
        margin: 0, 
        padding: 0 
      }}>
        <li style={{ cursor: 'pointer' }}>Home</li>
        <li style={{ cursor: 'pointer' }}>Courses</li>
        <li style={{ cursor: 'pointer' }}>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;