import './listEmployees.scss'
import useEmployeeTable from '../../hooks/useEmployeeTableJquery'

function ListEmployees() {

    useEmployeeTable()

    return (
        <>
            <main>
                <div id="employee-div" className="container">
                    <h1>Current Employees</h1>
                    <table id="employee-table" className="display"></table>
                </div>
            </main>
        </>
    )
}

export default ListEmployees