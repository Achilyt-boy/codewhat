import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search courses by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '10px 14px',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          outline: 'none'
        }}
      />
    </div>
  );
}

export default SearchBar;