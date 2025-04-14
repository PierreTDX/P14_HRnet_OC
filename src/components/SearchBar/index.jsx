import React from 'react';
import iconSearch from '../../assets/img/chercher.png';

const SearchBar = ({ value, onChange }) => (

    <div className="searchBar">
        <div className="searchIcon">
            <img src={iconSearch} alt="icon search" width={18} height={18} />
        </div>
        <input
            type="text"
            placeholder="Search all columns"
            value={value}
            onChange={onChange}
            className="searchInput"
        />
    </div>
);

export default SearchBar;