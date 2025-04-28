import React from 'react';
import { departments } from '../../data/departements'
import FloatingDateInput from './FloatingInputs/FloatingDateInput';
import FloatingSelectInput from './FloatingInputs/FloatingSelectInput';

function InternalInfoSection({ errors, control, registerOptions }) {
    return (
        <fieldset>
            <legend>Internal information</legend>
            <div className='containerFormInternalInfo'>
                <div className='containerInputInternalInfo'>

                    <FloatingDateInput
                        name="startDate"
                        label="Start Date"
                        control={control}
                        rules={registerOptions.startDate}
                        errors={errors}
                        minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 80))}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
                    />

                </div>

                <div className='containerInputInternalInfo'>

                    <FloatingSelectInput
                        name="department"
                        label="Department"
                        control={control}
                        errors={errors}
                        rules={registerOptions.department}
                        options={departments.map(dep => ({ value: dep.name, label: dep.name }))}

                    />

                </div>
            </div>
        </fieldset>
    );
}

export default InternalInfoSection;