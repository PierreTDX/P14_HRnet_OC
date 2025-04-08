import './header.scss'
import Logo from '../../assets/img/logoNoBackground.webp'
import AddUser from '../../assets/img/addUserWhite.webp'
import ListUsers from '../../assets/img/listUsersWhite.webp'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function Header() {

    const { pathname } = useLocation();

    const isHome = pathname === '/';
    const isCreatePage = pathname === '/createemployee';
    const isListPage = pathname === '/listemployees';

    return (
        <>
            <header>
                <NavLink to={'/'} className='logo' title='Go Home'>
                    <img width='100px' height='100px' src={Logo} alt="logo" />
                    <h1>HRnet</h1>
                </NavLink>
                {!isHome && (
                    <nav>
                        {!isCreatePage && (<NavLink to={'/createemployee'} className='btn'><img width='24px' height='24px' src={AddUser} alt="icon add user" className='icon' title='Create Employee' /><span className="btntext">Create Employee</span></NavLink>)}
                        {!isListPage && (<NavLink to={'/listemployees'} className='btn'><img width='24px' height='24px' src={ListUsers} alt="icon user list" className='icon' title='View Current Employees' /><span className="btntext">View Current Employees</span></NavLink>)}
                    </nav>
                )}
            </header>
        </>
    )
}

export default Header