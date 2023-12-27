import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";



const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px'
    
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    backgroundColor: '#ddd', 
    color: 'black', 
    border: 'none',
    backgroundColor: searchQuery ? 'white' : 'initial',
  };

  const iconStyle = {
    marginRight: '5px', // Adjust the margin as needed
  };

  return (
    <div style={searchBarStyle}>
      <FaSearch id="search-icon" style={iconStyle} />
      <input
        type="text"
        placeholder="Search..."
        icon="search"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={inputStyle}
      />
    </div>
  );
};

export default SearchBar;
