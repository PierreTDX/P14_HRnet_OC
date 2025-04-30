import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import ClearButton from '../../../../ClearButton';
import 'react-datepicker/dist/react-datepicker.css';
import './dateInput.scss';

const CustomDateInput = React.forwardRef(({ value, onClick, onChange, onFocus, onBlur, placeholder, className, onKeyDown, id }, ref) => {

    return (
        <input
            type="text"
            ref={ref}
            onClick={onClick}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className={className}
            onKeyDown={onKeyDown}
            id={id}
        />
    );
});

function DateInput({ name, control, rules, minDate, maxDate, onFocus, onBlur, className, placeholder, trigger, formRef, open, setOpen }) {
    const isControlled = typeof open !== 'undefined';
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpenFinal = isControlled ? open : internalOpen;

    const updateOpen = setOpen ?? setInternalOpen;

    const handleRawChange = (e) => {
        if (e.nativeEvent.inputType === undefined) return; // Ignore click from calendar

        let value = e.target.value.replace(/\D/g, ''); // On garde que les chiffres
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
        if (value.length > 10) value = value.slice(0, 10); // Limite la longueur de la chaîne

        e.target.value = value;
    };

    const handleFocus = (e) => {
        updateOpen(true); // Ouvre le calendrier quand le champ est focus
        onFocus?.(e);
    };

    const handleBlur = (e, field) => {
        field.onBlur();
        onBlur?.(e);
        updateOpen(false); // Ferme le calendrier lorsque le champ perd le focus
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateOpen(false);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <div className="date-input-wrapper">
                    <DatePicker
                        id={name}
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => {
                            field.onChange(date);
                            trigger(name);
                            updateOpen(false);
                        }}
                        onChangeRaw={handleRawChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText={placeholder}
                        minDate={minDate}
                        maxDate={maxDate}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, field)}
                        open={isOpenFinal}
                        className={className}
                        onKeyDown={handleKeyDown}

                        customInput={
                            <CustomDateInput
                                ref={formRef}
                                onFocus={handleFocus}  // Handle focus on the input itself
                                onBlur={(e) => handleBlur(e, field)} // Handle blur when focus is lost
                                onKeyDown={handleKeyDown}
                                id={name}
                            />}
                    />
                    <ClearButton
                        value={field.value}
                        onChange={() => field.onChange(null)}
                        label="Clear"
                    />
                </div>
            )}
        />
    );
}

export default DateInput;