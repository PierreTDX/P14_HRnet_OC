import React from 'react';
import { departments } from '../../data/departements'
import DateInput from '../../components/DateInput'
import SelectInput from '../../components/SelectInput'



function InternalInfoSection({ errors, control, registerOptions }) {
    return (
        <fieldset>
            <legend>Internal information</legend>
            <div className='containerFormInternalInfo'>
                <div className='containerInputInternalInfo'>
                    {/* Start Date */}
                    <label htmlFor="startDate">Start Date</label>
                    <DateInput
                        name="startDate"
                        label="Start Date"
                        control={control}
                        rules={registerOptions.startDate}
                        minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 80))}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
                    />
                    <p
                        id="startDateError"
                        role="alert"
                        aria-live="assertive"
                        className={`errorMessage ${errors.startDate ? '' : 'invisible'}`}
                    >
                        {errors.startDate?.message || '\u00A0'}
                    </p>

                </div>

                <div className='containerInputInternalInfo'>
                    {/* Department */}
                    <label htmlFor="department">Department</label>
                    <SelectInput
                        name="department"
                        control={control}
                        options={departments.map(dep => ({ value: dep.name, label: dep.name }))}
                        placeholder="Select a department"
                        rules={registerOptions.department}
                        error={errors.department}
                    />
                    <p
                        id="departmentError"
                        role="alert"
                        aria-live="assertive"
                        className={`errorMessage ${errors.department ? '' : 'invisible'}`}
                    >
                        {errors.department?.message || '\u00A0'}
                    </p>

                </div>
            </div>
        </fieldset>
    );
}

export default InternalInfoSection;