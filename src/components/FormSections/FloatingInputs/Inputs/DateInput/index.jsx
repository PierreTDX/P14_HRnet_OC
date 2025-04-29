import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import ClearButton from '../../../../ClearButton';
import 'react-datepicker/dist/react-datepicker.css';
import './dateInput.scss';

function DateInput({ name, control, rules, minDate, maxDate, onFocus, onBlur, className, placeholder, trigger }) {

    // Gère la saisie clavier et ajoute les slashs
    const handleRawChange = (e) => {
        if (e.nativeEvent.inputType === undefined) return; // Ignore click from calendar

        let value = e.target.value.replace(/\D/g, ''); // On garde que les chiffres
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
        if (value.length > 10) value = value.slice(0, 10); // Limite la longueur de la chaîne

        e.target.value = value; // Mise à jour de l'input directement
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
                // console.log("🚀 ~ DateInput ~ isFocused:", isFocused)
                return (
                    <div className="date-input-wrapper">
                        <DatePicker
                            id={name}
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => {
                                field.onChange(date);
                                trigger(name);
                            }}
                            onChangeRaw={handleRawChange} // assistance à la saisie
                            dateFormat="MM/dd/yyyy"
                            placeholderText={placeholder}
                            minDate={minDate}
                            maxDate={maxDate}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onFocus={onFocus}
                            onBlur={(e) => {
                                field.onBlur();
                                onBlur?.(e);
                            }}
                            className={className}
                        />
                        <ClearButton value={field.value} onChange={() => field.onChange(null)} label="Clear" />
                    </div>
                );
            }}
        />
    );
}

export default DateInput;
