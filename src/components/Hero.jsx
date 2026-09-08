import React from 'react';

function Hero() {
  return (
    <section style={{ 
      textAlign: 'center', 
      padding: '50px 20px', 
      backgroundColor: '#f1f5f9', 
      borderBottom: '1px solid #e2e8f0' 
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#0f172a' }}>
        Start Your Tech Journey Today
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '600px', margin: '15px auto' }}>
        Learn full-stack development, database architecture, and cloud technology with step-by-step guidance.
      </p>
      <button style={{ 
        padding: '12px 24px', 
        fontSize: '1rem', 
        backgroundColor: '#0284c7', 
        color: '#ffffff', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
      }}>
        Explore Courses
      </button>
    </section>
  );
}

export default Hero;