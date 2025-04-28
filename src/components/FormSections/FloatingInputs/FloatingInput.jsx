import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { formatName, trimFieldValue } from '../../../utils/tools/sanitizeTrimmedInput'
import ErrorMessage from '../ErrorMessage';

function FloatingInput({ name, label, register, registerOptions, errors, setValue, trigger, control, type = "text" }) {

    const [focused, setFocused] = useState(false);
    const value = useWatch({ control, name: name });

    const isActive = focused || !!value;

    const handleBlur = (e) => {
        setFocused(false);
        trigger && trigger(name);
        if (type === "text") {
            if (name === "street" || name === "zipCode") {
                trimFieldValue(name, setValue)(e);
            } else {
                formatName(name, setValue)(e);
            }
        }
    };

    return (
        <>
            <div className="input-container">
                <label htmlFor={name} className={isActive ? 'focused' : ''}>{label}</label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    autoComplete="off"
                    {...register(name, registerOptions)}
                    aria-invalid={errors[name] ? 'true' : 'false'}
                    aria-describedby={`${name}Error`}
                    onFocus={() => setFocused(true)}
                    onBlur={handleBlur} // Utilise handleBlur pour gérer le formatage
                    onChange={(e) => {
                        register(name).onChange(e);  // Applique l'onChange de react-hook-form
                        trigger(name);  // Valide immédiatement le champ
                    }}
                    className={`${isActive ? 'focused' : ''} ${errors[name] ? 'redInput' : ''}`}
                />
            </div>

            <ErrorMessage name={name} errors={errors} />
        </>
    );
}

export default FloatingInput;