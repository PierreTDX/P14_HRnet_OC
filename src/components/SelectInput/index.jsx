import './selectInput.scss'
import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import ClearButton from '../ClearButton';

const customStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: 32,
        height: 32,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        borderRadius: 8,
        borderWidth: state.isFocused ? 2 : 1,
        borderStyle: 'solid',
        borderColor: 'hsl(70.47deg 75.63% 38.63%)',
        boxShadow: 'none',
        '&:hover': {
            borderColor: 'hsl(70.47deg 75.63% 38.63%)',
        },
    }), valueContainer: (base) => ({
        ...base,
        padding: '0px 5px',
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
    }),
    indicatorsContainer: (base) => ({
        ...base,
        height: 32,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? 'hsl(70.47deg 75.63% 38.63%)'
            : state.isFocused
                ? 'hsl(70.47deg 75.63% 60%)' // Couleur différente quand l'option est survolée
                : 'transparent',
        color: state.isSelected ? 'white' : 'black',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'hsl(70.47deg 75.63% 60%)', // Hover sur les options
        },
    }),
};


function SelectInput({ name, control, options, placeholder, rules, value, onChange }) {
    const sortedOptions = [...options].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    );

    const selectedOption = sortedOptions.find(option => option.value === value) || null;

    if (control) {
        return (
            <div>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={sortedOptions}
                            styles={customStyles}
                            placeholder={placeholder}
                            isSearchable
                            value={sortedOptions.find(option => option.value === field.value) || null}
                            onChange={val => field.onChange(val.value)}
                            classNamePrefix="selectInput"
                            className="selectInput-container"
                        />
                    )}
                />
            </div>
        );
    }

    return (
        <div className="searchSelect">
            <Select
                name={name}
                options={sortedOptions}
                styles={customStyles}
                placeholder={placeholder}
                isSearchable
                value={selectedOption}
                onChange={val => onChange(val ? val.value : '')}
                classNamePrefix="selectInput"
                className="selectInput-container"
                getOptionLabel={
                    name === 'state'
                        ? (e) => `${e.value} - ${e.label}`
                        : undefined
                } />
            <ClearButton value={value} onChange={() => onChange('')} label="Clear filter" />
        </div>);
}

export default SelectInput;