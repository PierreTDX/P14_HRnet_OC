import React, { useState, useRef, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import DateInput from './Inputs/DateInput';
import ErrorMessage from '../ErrorMessage';

function FloatingDateInput({ name, label, control, rules, errors, minDate, maxDate, trigger, formRef }) {
    const [focused, setFocused] = useState(false);
    const value = useWatch({ control, name });
    const wrapperRef = useRef(null);

    const isActive = focused || !!value;

    // Gérer le focus OUT (surtout vers un SelectInput!)
    useEffect(() => {
        const handleFocusOut = (e) => {
            const isInWrapper = wrapperRef.current?.contains(e.relatedTarget);
            if (!isInWrapper) {
                setFocused(false);
            }
        };

        const currentWrapper = wrapperRef.current;
        currentWrapper?.addEventListener('focusout', handleFocusOut);

        return () => {
            currentWrapper?.removeEventListener('focusout', handleFocusOut);
        };
    }, []);


    return (
        <>
            <div className="input-container" ref={wrapperRef}>
                <label htmlFor={name} className={isActive ? 'focused' : ''}>
                    {label}
                </label>
                <DateInput
                    name={name}
                    control={control}
                    rules={rules}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={() => trigger(name)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`${isActive ? 'focused' : ''} ${errors[name] ? 'redInput' : ''}`}
                    placeholder={focused ? 'mm/dd/yyyy' : ''}
                    trigger={trigger}
                    formRef={formRef}
                />
            </div>
            <ErrorMessage name={name} errors={errors} />
        </>
    );
}

export default FloatingDateInput;