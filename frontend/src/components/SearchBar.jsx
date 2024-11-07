import React, { useState } from 'react';

export function SearchBar({ setSearchQuery, setSortOption }) {
  const [search, setSearch] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setSearchQuery(search);
  }

  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <div className="searchSortContainer">
      <form onSubmit={handleSubmit} className="searchBar">
        <input 
          type="text" 
          placeholder="Search for product" 
          value={search} 
          onChange={(event) => setSearch(event.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      
      <div className="sortOptions">
        <label>Sort by: </label>
        <select onChange={handleSortChange}>
          <option value="az">A-Z</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
