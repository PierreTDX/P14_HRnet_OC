import './selectInput.scss';
import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import ClearButton from '../../../../ClearButton';

function SelectInput({
    name,
    control,
    options,
    rules,
    value,
    onChange,
    onFocus,
    onBlur,
    className,
    errors
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isError = errors?.[name];
    const selectRef = useRef(null);

    const sortedOptions = [...options].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    );

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: 32,
            height: 32,
            padding: 0,
            paddingLeft: 0,
            borderRadius: 8,
            borderWidth: state.isFocused ? 2 : 1,
            borderStyle: 'solid',
            borderColor: isError
                ? 'red'
                : 'hsl(70.47deg 75.63% 38.63%)',
            boxShadow: 'none',
            '&:hover': {
                borderColor: isError ? 'red' : 'hsl(70.47deg 75.63% 38.63%)',
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
        }),
    };

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !menuOpen) {
            e.preventDefault();
            const form = document.querySelector('form#create-employee');

            // Sélectionne les éléments input et les boutons avec la classe btnForm
            const focusables = Array.from(
                form.querySelectorAll('input, button.btnForm')
            ).filter(el => !el.disabled && el.offsetParent !== null); // Elimine les éléments non focusables

            const index = focusables.indexOf(document.activeElement);
            if (index !== -1 && index < focusables.length - 1) {
                focusables[index + 1].focus();
            }
        }
    };

    const renderSelect = (field = {}) => (
        <Select
            {...field}
            ref={selectRef}
            name={name}
            inputId={name}
            aria-labelledby={`${name}-label`}
            options={sortedOptions}
            styles={customStyles}
            placeholder={isFocused || !control ? `Select a ${name}` : ''}
            isSearchable
            value={sortedOptions.find(option => option.value === (field.value ?? value)) || null}
            onChange={handleChange(field.onChange ?? onChange)}
            onFocus={handleFocus}
            onBlur={handleBlur(field.onBlur)}
            onMenuOpen={() => setMenuOpen(true)}
            onMenuClose={() => setMenuOpen(false)}
            classNamePrefix="selectInput"
            className={control ? `${className} selectInput-container` : 'selectInputSearch-container'}
            getOptionLabel={
                !control && name === 'state'
                    ? (e) => `${e.value} - ${e.label}`
                    : undefined
            }
            onKeyDown={handleKeyDown}
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
                            <ClearButton
                                value={field.value}
                                onChange={() => field.onChange('')}
                                label="Clear filter"
                            />
                        </>
                    )}
                />
            ) : (
                <>
                    {renderSelect()}
                    <ClearButton
                        value={value}
                        onChange={() => onChange('')}
                        label="Clear filter"
                    />
                </>
            )}
        </div>
    );
}

export default SelectInput;