import './selectInput.scss'
import React, { useState } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import ClearButton from '../../../../ClearButton';

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
    }),
    valueContainer: (base) => ({
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
                ? 'hsl(70.47deg 75.63% 60%)'
                : 'transparent',
        color: state.isSelected ? 'white' : 'black',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'hsl(70.47deg 75.63% 60%)',
        },
    }),
};

function SelectInput({ name, control, options, rules, value, onChange, onFocus, onBlur, className }) {
    const [isFocused, setIsFocused] = useState(false);

    const sortedOptions = [...options].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    );

    const handleChange = (fieldOnChange) => (val) => {
        const selectedValue = val ? val.value : '';
        fieldOnChange(selectedValue);
        onChange?.(selectedValue);
    };

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (fieldOnBlur) => (e) => {
        setIsFocused(false);
        fieldOnBlur?.();
        onBlur?.(e);
    };

    const renderSelect = (field = {}) => (
        <Select
            {...field}
            name={name}
            options={sortedOptions}
            styles={customStyles}
            placeholder={(isFocused || !control) ? `select a ${name}` : ''}
            isSearchable
            value={sortedOptions.find(option => option.value === (field.value ?? value)) || null}
            onChange={handleChange(field.onChange ?? onChange)}
            onFocus={handleFocus}
            onBlur={handleBlur(field.onBlur)}
            classNamePrefix="selectInput"
            className={control ? `${className} selectInput-container` : 'selectInputSearch-container'}
            getOptionLabel={name === 'state' ? (e) => `${e.value} - ${e.label}` : undefined}
        />
    );

    return (
        <div className="selectInput-wrapper">
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <>
                            {renderSelect(field)}
                            <ClearButton value={field.value} onChange={() => field.onChange('')} label="Clear filter" />
                        </>
                    )}
                />
            ) : (
                <>
                    {renderSelect()}
                    <ClearButton value={value} onChange={() => onChange('')} label="Clear filter" />
                </>
            )}
        </div>
    );
}

export default SelectInput;