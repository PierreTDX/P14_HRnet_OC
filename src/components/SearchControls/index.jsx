import React from 'react';
import './searchControls.scss';

const SearchControls = ({ filterStep, handleToggle }) => (
    <div className="searchControls" onClick={handleToggle}>
        {filterStep < 2 ? (
            <div className='plus' title='Add filter option'></div>
        ) : (
            <div className='moins' title='Delete all filter option'></div>
        )}
    </div>
);

export default SearchControls;