import React from 'react';

function Hero() {
  return (
    <section style={{ 
      textAlign: 'center', 
      padding: 'clamp(30px, 5vw, 50px) 20px', 
      backgroundColor: '#f1f5f9', 
      borderBottom: '1px solid #e2e8f0' 
    }}>
      <h1 style={{ 
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
        color: '#0f172a',
        marginBottom: '15px',
        lineHeight: '1.2'
      }}>
        Start Your Tech Journey Today
      </h1>
      <p style={{ 
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
        color: '#475569', 
        maxWidth: '600px', 
        margin: '0 auto 25px',
        lineHeight: '1.6'
      }}>
        Learn full-stack development, database architecture, and cloud technology with step-by-step guidance.
      </p>
      <button style={{ 
        padding: 'clamp(10px, 1.5vw, 12px) clamp(20px, 3vw, 24px)', 
        fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
        backgroundColor: '#0284c7', 
        color: '#ffffff', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#0369a1'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#0284c7'}
    >
        Explore Courses
      </button>
    </section>
  );
}

export default Hero;