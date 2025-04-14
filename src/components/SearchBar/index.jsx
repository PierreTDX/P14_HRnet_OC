import React from 'react';
import iconSearch from '../../assets/img/chercher.png';
import ClearButton from '../ClearButton';
import './searchBar.scss';


const SearchBar = ({ value, onChange }) => {

    return (
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
            <ClearButton value={value} onChange={onChange} label="Clear search" />
        </div>
    );
};

export default SearchBar;