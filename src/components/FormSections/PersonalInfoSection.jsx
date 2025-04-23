import React from 'react';
import { formatName } from '../../utils/tools/sanitizeTrimmedInput'
import DateInput from '../../components/DateInput'


function PersonalInfoSection({ register, errors, setValue, control, registerOptions }) {
    return (
        <fieldset>
            <legend>Personal Information</legend>

            {/* First Name */}
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="off"
                {...register("firstName", registerOptions.firstName)}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby="firstNameError"
                onBlur={formatName("firstName", setValue)}
            />
            <p
                id="firstNameError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.firstName ? '' : 'invisible'}`}
            >
                {errors.firstName?.message || '\u00A0'}
            </p>


            {/* Last Name */}
            <label htmlFor="lastName">Last Name</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="off"
                {...register("lastName", registerOptions.lastName)}
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby="lastNameError"
                onBlur={formatName("lastName", setValue)}
            />
            <p
                id="lastNameError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.lastName ? '' : 'invisible'}`}
            >
                {errors.lastName?.message || '\u00A0'}
            </p>

            {/* Birth Date */}
            <label htmlFor="dateOfBirth">Birth Date</label>
            <DateInput
                name="dateOfBirth"
                control={control}
                rules={registerOptions.dateOfBirth}
                maxDate={new Date()} // aujourd'hui
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 100))}
            />
            <p
                id="dateOfBirthError"
                role="alert"
                aria-live="assertive"
                className={`errorMessage ${errors.dateOfBirth ? '' : 'invisible'}`}
            >
                {errors.dateOfBirth?.message || '\u00A0'}
            </p>

        </fieldset>
    );
}

export default PersonalInfoSection;