import React from 'react';
import FloatingInput from './FloatingInputs/FloatingInput';
import FloatingSelectInput from './FloatingInputs/FloatingSelectInput';
import { states } from '../../data/states';

function AddressSection({ register, errors, setValue, control, registerOptions, trigger, isSubmitted }) {
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
                isSubmitted={isSubmitted}
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
                isSubmitted={isSubmitted}
            />

            <FloatingSelectInput
                name="state"
                label="State"
                control={control}
                errors={errors}
                rules={registerOptions.state}
                options={states.map(state => ({
                    value: state.abbreviation,
                    label: state.name
                }))}
            />

            <FloatingInput
                name="zipCode"
                label="Zip Code"
                register={register}
                registerOptions={registerOptions.zipCode}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                control={control}
                isSubmitted={isSubmitted}
            />

        </fieldset>
    );
}

export default AddressSection;
