import React from 'react';
import FloatingInput from './FloatingInput';
import FloatingDateInput from './FloatingDateInput';


function PersonalInfoSection({ register, errors, setValue, control, registerOptions, trigger }) {

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
            />


            <FloatingDateInput
                name="dateOfBirth"
                label="Birth Date"
                control={control}
                rules={registerOptions.dateOfBirth}
                errors={errors}
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 100))}
                maxDate={new Date()}
            />

        </fieldset>
    );
}

export default PersonalInfoSection;