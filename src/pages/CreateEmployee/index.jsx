import './createEmployee.scss'
import { states } from '../../data/states'
import { departments } from '../../data/departements'
import { useCreateEmployee } from '../../hooks/useCreateEmployee'
import { useForm } from 'react-hook-form'
import NavButton from '../../components/NavButton'
import { validateGenericName } from '../../validators/nameValidador'
import { validateBirthDate } from '../../validators/birthDateValidator'
import { validateZipCode } from '../../validators/zipCodeValidator'
import { validateStreet } from '../../validators/streetValidator'
import { validateStartDate } from '../../validators/startDateValidator'
import { formatName, formatStringName, trimFieldValue } from '../../validators/sanitizeTrimmedInput'

function CreateEmployee() {
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm()
    const { saveEmployee } = useCreateEmployee()
    const dateOfBirth = watch("dateOfBirth");


    const formatToMMDDYYYY = (isoDate) => {
        const [year, month, day] = isoDate.split("-");
        return `${month}/${day}/${year}`;
    };

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            firstName: formatStringName(data.firstName),
            lastName: formatStringName(data.lastName),
            street: formatStringName(data.street),
            city: formatStringName(data.city),
            zipCode: data.zipCode.trim(),
            dateOfBirth: formatToMMDDYYYY(data.dateOfBirth),
            startDate: formatToMMDDYYYY(data.startDate),
        };


        saveEmployee(formattedData);
        console.log(formattedData);

        reset();
    };

    const registerOptions = {
        firstName: {
            required: "* First name is required",
            validate: validateGenericName,
        },
        lastName: {
            required: "* Last name is required",
            validate: validateGenericName,
        },
        dateOfBirth: {
            required: "* Birth date is required",
            validate: validateBirthDate,
        },
        zipCode: {
            required: "* Zip code is required",
            validate: validateZipCode,
        },
        department: {
            required: "* Department is required",
        },
        street: {
            required: "* Street is required",
            validate: validateStreet,
        },
        city: {
            required: "* City is required",
            validate: validateGenericName,
        },
        state: {
            required: "* State is required",
        },
        startDate: {
            required: "* Start date is required",
            validate: (value) => validateStartDate(value, dateOfBirth),
        },
    }

    return (
        <>
            <h1 className='pageTitle'>Add New Employee</h1>
            <main className='formCreateEmployee'>
                <form id="create-employee" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className='containerForm'>
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
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                max={new Date().toISOString().split("T")[0]} // Pas de date après aujourd'hui
                                min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0]} // Pas de date plus vieille que 100 ans
                                {...register("dateOfBirth", registerOptions.dateOfBirth)}
                                aria-invalid={errors.dateOfBirth ? "true" : "false"}
                                aria-describedby="dateOfBirthError"
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
                            <select
                                id="state"
                                name="state"
                                {...register("state", registerOptions.state)}
                                aria-invalid={errors.state ? "true" : "false"}
                                aria-describedby="stateError"
                            >
                                <option value="">Select a state</option>
                                {states.map((state) => (
                                    <option key={state.abbreviation} value={state.abbreviation}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
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

                        <fieldset>
                            <legend>Internal information</legend>
                            <div className='containerFormInternalInfo'>
                                <div className='containerInputInternalInfo'>
                                    {/* Start Date */}
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 80)).toISOString().split("T")[0]} // Aujourd'hui - 80 ans
                                        max={new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split("T")[0]} // Aujourd'hui + 10 ans                              
                                        {...register("startDate", registerOptions.startDate)}
                                        aria-invalid={errors.startDate ? "true" : "false"}
                                        aria-describedby="startDateError"
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
                                    <select
                                        id="department"
                                        name="department"
                                        {...register("department", registerOptions.department)}
                                        aria-invalid={errors.department ? "true" : "false"}
                                        aria-describedby="departmentError"
                                    >
                                        <option value="">Select a department</option>
                                        {departments.map((department) => (
                                            <option key={department.name} value={department.name}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
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
                    </div>
                    <div className='containerBtn'>

                        {/* Submit Button */}
                        <NavButton
                            type="submit"
                            text="Save"
                            className="btnForm"
                        />

                        {/* Clear Button */}
                        <NavButton
                            text="Clear"
                            className="btnForm btnClear"
                            onClick={() => reset()}
                        />
                    </div>
                </form >

                <div id="confirmation" className="modal">
                    Employee Created!
                </div>
            </main >
        </>
    )
}

export default CreateEmployee;