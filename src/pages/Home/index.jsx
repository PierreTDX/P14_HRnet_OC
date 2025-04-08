import './home.scss'
import { NavLink } from 'react-router-dom'
import useInitEmployees from '../../hooks/useInitEmployees'
import AddUser from '../../assets/img/addUserWhite.webp'
import ListUsers from '../../assets/img/listUsersWhite.webp'

function Home() {

    useInitEmployees()

    return (
        <>
            <main className='home'>
                <h1>Welcome to your employee records management system</h1>
                <nav className="navHome">
                    <NavLink to={'/createemployee'} className='btn btnHome'><img width='24px' height='24px' src={AddUser} alt="icon add user" className='icon' />Create Employee</NavLink>
                    <NavLink to={'/listemployees'} className='btn btnHome'><img width='24px' height='24px' src={ListUsers} alt="icon user list" className='icon' />View Current Employees</NavLink>
                </nav>
            </main>
        </>
    )
}

export default Home