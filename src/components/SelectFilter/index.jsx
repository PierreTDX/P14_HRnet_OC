import React from 'react';
import { states } from '../../data/states';
import { departments } from '../../data/departements';
import ClearButton from '../ClearButton';
import './selectFilter.scss';

const SelectFilter = ({ type, value, onChange }) => {
    // Sélection des données selon le type
    const rawOptions = type === 'state' ? states : departments;

    // Formatage des options selon le type
    const formattedOptions = rawOptions.map(option => {
        if (type === 'state') {
            return {
                value: option.abbreviation,
                label: `${option.abbreviation} - ${option.name}`
            };
        } else {
            return {
                value: option.name,
                label: option.name
            };
        }
    });

    return (
        <div className="searchSelect">
            <select
                name={type}
                id={type}
                value={value}
                onChange={onChange}
            >
                <option value="">
                    {type === 'state' ? 'Select State' : 'Select Department'}
                </option>
                {formattedOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <ClearButton value={value} onChange={onChange} label="Clear filter" />
        </div>
    );
};

export default SelectFilter;