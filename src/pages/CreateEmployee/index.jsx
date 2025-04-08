import './createEmployee.scss'
import { useCreateEmployee } from '../../hooks/useCreateEmployeeJquery'
import { useForm } from 'react-hook-form'

function CreateEmployee() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { saveEmployee } = useCreateEmployee()

    const onSubmit = (data) => {
        // saveEmployee(data); // Sauvegarde des données de l'employé
        console.log(data); // Affiche les données dans la console
    }

    const namesPattern = /^([a-zA-Z-' ]+)$/
    const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/

    const registerOptions = {
        firstName: {
            required: "* First name is required",
            pattern: {
                value: namesPattern,
                message:
                    "* First name should only contain letters, - or ' ",
            },
        },
    }

    return (
        <>
            <h1 className='pageTitle'>Create Employee</h1>
            <main>
                <form id="create-employee" onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="off"
                        {...register("firstName", registerOptions.firstName)}
                        aria-invalid={errors.firstName ? "true" : "false"} // Indication que le champ est invalide si erreur
                        aria-describedby="firstNameError" // Associé à l'élément d'erreur
                    />
                    {errors.firstName && (
                        <p id="firstNameError" role="alert" aria-live="assertive" className='errorMessage'>
                            {errors.firstName.message}
                        </p>
                    )}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lasttName"
                    />

                    <button className='center' type="submit">Save</button>
                </form>
            </main>
            {/* <main>
                <div className="container">

                    <h1>Create Employee</h1>

                    <form id="create-employee" onSubmit={saveEmployee}>
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" />

                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" />

                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input id="date-of-birth" type="text" />

                        <label htmlFor="start-date">Start Date</label>
                        <input id="start-date" type="text" />

                        <fieldset className="address">
                            <legend>Address</legend>

                            <label htmlFor="street">Street</label>
                            <input id="street" type="text" />

                            <label htmlFor="city">City</label>
                            <input id="city" type="text" />

                            <label htmlFor="state">State</label>
                            <select name="state" id="state"></select>

                            <label htmlFor="zip-code">Zip Code</label>
                            <input id="zip-code" type="number" />
                        </fieldset>

                        <label htmlFor="department">Department</label>
                        <select name="department" id="department">
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </select>

                        <button className='center' type="submit">Save</button>
                    </form>

                    <div id="confirmation" className="modal">
                        Employee Created!
                    </div>
                </div>
            </main> */}
        </>
    )
}

export default CreateEmployee