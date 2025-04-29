import React from 'react';
import FloatingInput from './FloatingInputs/FloatingInput';
import FloatingDateInput from './FloatingInputs/FloatingDateInput';

function PersonalInfoSection({ register, errors, setValue, control, registerOptions, trigger, isSubmitted }) {

    return (
        <fieldset>
            <legend>Personal Information</legend>

            <FloatingInput
                name="firstName"
                label="First Name"
                register={register}
                registerOptions={registerOptions.firstName}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                control={control}
                isSubmitted={isSubmitted}
            />

            <FloatingInput
                name="lastName"
                label="Last Name"
                register={register}
                registerOptions={registerOptions.lastName}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                control={control}
                isSubmitted={isSubmitted}
            />

            <FloatingDateInput
                name="dateOfBirth"
                label="Birth Date"
                control={control}
                rules={registerOptions.dateOfBirth}
                errors={errors}
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 100))}
                maxDate={new Date()}
                trigger={trigger}
            />

        </fieldset>
    );
}

export default PersonalInfoSection;