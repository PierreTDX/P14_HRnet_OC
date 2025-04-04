import './home.scss'
import { NavLink } from 'react-router-dom'
import useInitEmployees from '../../hooks/useInitEmployees'

function Home() {

    useInitEmployees()

    return (
        <>
            <main>
                <div className="title">
                    <h1>HRnet</h1>
                </div>
                <div className="container">
                    <NavLink to={'/createemployee'}>Create Employee</NavLink>
                    <NavLink to={'/listemployees'}>View Current Employees</NavLink>
                </div>
            </main>
        </>
    )
}

export default Home