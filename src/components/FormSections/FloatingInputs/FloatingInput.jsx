import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { formatName, trimFieldValue } from '../../../utils/tools/sanitizeTrimmedInput'
import ErrorMessage from '../ErrorMessage';

function FloatingInput({ name, label, register, registerOptions, errors, setValue, trigger, control, type = "text", isSubmitted }) {

    const [focused, setFocused] = useState(false);
    const value = useWatch({ control, name: name });

    // Détermine si l'erreur doit être affichée
    const error = errors?.[name];
    const isRequiredError = error?.type === "required";
    const showError =
        (!isRequiredError && error) || // affiche toutes les erreurs sauf "required"
        (isRequiredError && isSubmitted); // affiche "required" uniquement après submit

    const isActive = focused || !!value;

    const handleBlur = (e) => {
        setFocused(false);
        if (type === "text") {
            if (name === "street" || name === "zipCode") {
                trimFieldValue(name, setValue)(e);
            } else {
                formatName(name, setValue)(e);
            }
        }
    };

    const handleChange = async (e) => {
        register(name).onChange(e);

        const newValue = e.target.value;

        // Ne déclenche pas trigger si le champ est vide (évite le "is required")
        if (newValue.trim() !== '') {
            await trigger(name); // Valide uniquement les erreurs dynamiques
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`${isActive ? 'focused' : ''} ${showError ? 'redInput' : ''}`}
                />
            </div>

            <ErrorMessage name={name} errors={errors} show={showError} />
        </>
    );
}

export default FloatingInput;