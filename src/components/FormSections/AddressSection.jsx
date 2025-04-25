import React from 'react';
import FloatingInput from './FloatingInput';
import { states } from '../../data/states';
import SelectInput from '../../components/SelectInput';
import ErrorMessage from './ErrorMessage';

function AddressSection({ register, errors, setValue, control, registerOptions, trigger }) {
    return (
        <fieldset>
            <legend>Address</legend>

            <FloatingInput
                name="street"
                label="Street"
                register={register}
                registerOptions={registerOptions.street}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                control={control}
            />

            <FloatingInput
                name="city"
                label="City"
                register={register}
                registerOptions={registerOptions.city}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                control={control}
            />

            {/* State */}
            <div className="input-container">
                <label htmlFor="state" className={errors.state ? 'focused' : ''}>
                    State
                </label>
                <SelectInput
                    name="state"
                    control={control}
                    options={states.map(state => ({
                        value: state.abbreviation,
                        label: state.name
                    }))}
                    placeholder="Select a state"
                    rules={registerOptions.state}
                    error={errors.state}
                />
                <ErrorMessage name="state" errors={errors} />
            </div>

            <FloatingInput
                name="zipCode"
                label="Zip Code"
                register={register}
                registerOptions={registerOptions.zipCode}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                control={control}
            />
        </fieldset>
    );
}

export default AddressSection;
