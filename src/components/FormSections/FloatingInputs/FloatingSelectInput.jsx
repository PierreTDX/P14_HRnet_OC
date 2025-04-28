import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import SelectInput from './Inputs/SelectInput';
import ErrorMessage from '../ErrorMessage';

function FloatingSelectInput({ name, label, control, options, rules, errors }) {
    const [focused, setFocused] = useState(false);
    const value = useWatch({ control, name });

    const isActive = focused || !!value;

    return (
        <>
            <div className="input-container">
                <label htmlFor={name} className={isActive ? 'focused' : ''} id={`${name}-label`}>
                    {label}
                </label>
                <SelectInput
                    name={name}
                    control={control}
                    options={options}
                    rules={rules}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={isActive ? 'focused' : ''}
                />
            </div>
            <ErrorMessage name={name} errors={errors} />
        </>
    );
}

export default FloatingSelectInput;