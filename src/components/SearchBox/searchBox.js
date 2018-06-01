import React from 'react';
import './searchBox.css'

const SearchBox = ({ searchChange }) => {
  return (
    <div>
      <input
        className='searchInput'
        type='textarea'
        placeholder='search movies...'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;