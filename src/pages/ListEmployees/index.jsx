import './listEmployees.scss'
import { NavLink } from 'react-router-dom'
import useEmployeeTable from '../../hooks/useEmployeeTableJquery'

function ListEmployees() {

    useEmployeeTable()

    return (
        <>
            <main>
                <div id="employee-div" className="container">
                    <h1>Current Employees</h1>
                    <table id="employee-table" className="display"></table>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/createemployee'}>Create Employee</NavLink>
                </div>
            </main>
        </>
    )
}

export default ListEmployees