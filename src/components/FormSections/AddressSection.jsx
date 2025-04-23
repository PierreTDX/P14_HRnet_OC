import React from 'react';
import { formatName, trimFieldValue } from '../../utils/tools/sanitizeTrimmedInput'
import { states } from '../../data/states'
import SelectInput from '../../components/SelectInput'


function AddressSection({ register, errors, setValue, control, registerOptions }) {
    return (
        <fieldset>
            <legend>Address</legend>

            {/* Street */}
            <label htmlFor="street">Street</label>
            <input
                type="text"
                id="street"
                name="street"
                {...register("street", registerOptions.street)}
                aria-invalid={errors.street ? "true" : "false"}
                aria-describedby="streetError"
                onBlur={trimFieldValue("street", setValue)}
            />
            <p
                id="streetError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.street ? '' : 'invisible'}`}
            >
                {errors.street?.message || '\u00A0'}
            </p>

            {/* City */}
            <label htmlFor="city">City</label>
            <input
                type="text"
                id="city"
                name="city"
                {...register("city", registerOptions.city)}
                aria-invalid={errors.city ? "true" : "false"}
                aria-describedby="cityError"
                onBlur={formatName("city", setValue)}

            />
            <p
                id="cityError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.city ? '' : 'invisible'}`}
            >
                {errors.city?.message || '\u00A0'}
            </p>

            {/* State */}
            <label htmlFor="state">State</label>
            <SelectInput
                name="state"
                control={control}
                options={states.map(state => ({ value: state.abbreviation, label: state.name }))}
                placeholder="Select a state"
                rules={registerOptions.state}
                error={errors.state}
            />
            <p
                id="stateError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.state ? '' : 'invisible'}`}
            >
                {errors.state?.message || '\u00A0'}
            </p>

            {/* Zip Code */}
            <label htmlFor="zipCode">Zip Code</label>
            <input
                type="text"
                id="zipCode"
                name="zipCode"
                {...register("zipCode", registerOptions.zipCode)}
                aria-invalid={errors.zipCode ? "true" : "false"}
                aria-describedby="zipCodeError"
                onBlur={trimFieldValue("zipCode", setValue)}
            />
            <p
                id="zipCodeError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.zipCode ? '' : 'invisible'}`}
            >
                {errors.zipCode?.message || '\u00A0'}
            </p>

        </fieldset>
    );
}

export default AddressSection;