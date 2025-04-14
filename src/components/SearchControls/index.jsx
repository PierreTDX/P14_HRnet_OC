import React from 'react';
import iconplus from '../../assets/img/plus.png';
import iconminus from '../../assets/img/moins.png';
import './searchControls.scss';

const SearchControls = ({ filterStep, handleToggle }) => (
    <div className="searchControls" onClick={handleToggle}>
        {filterStep < 2 ? (
            <img src={iconplus} alt="icon plus" width={32} height={32} title='Add filter option' />
        ) : (
            <img src={iconminus} alt="icon minus" width={32} height={32} title='Delete all filter option' />
        )}
    </div>
);

export default SearchControls;