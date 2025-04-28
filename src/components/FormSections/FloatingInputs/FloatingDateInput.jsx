import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import DateInput from './Inputs/DateInput';
import ErrorMessage from '../ErrorMessage';

function FloatingDateInput({ name, label, control, rules, errors, minDate, maxDate }) {
    const [focused, setFocused] = useState(false);
    const value = useWatch({ control, name });

    const isActive = focused || !!value;

    return (
        <>
            <div className="input-container">
                <label htmlFor={name} className={isActive ? 'focused' : ''}>
                    {label}
                </label>
                <DateInput
                    name={name}
                    control={control}
                    rules={rules}
                    minDate={minDate}
                    maxDate={maxDate}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={isActive ? 'focused' : ''}
                />
            </div>
            <ErrorMessage name={name} errors={errors} />
        </>
    );
}

export default FloatingDateInput;