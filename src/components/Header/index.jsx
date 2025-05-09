import './header.scss';
import AddUser from '../../assets/img/addUserWhite24x24.webp';
import ListUsers from '../../assets/img/listUsersWhite24x24.webp';
import { NavLink, useLocation } from 'react-router-dom';
import NavButton from '../../components/NavButton';

function Header() {
    const { pathname } = useLocation();

    return (
        <header>
            <NavLink to="/" className="logo" title="Go Home">
                <h1>HRnet</h1>
            </NavLink>

            {pathname !== '/' && (
                <nav>
                    {pathname !== '/createemployee' && (
                        <NavButton
                            to="/createemployee"
                            icon={AddUser}
                            alt="icon add user"
                            text="Add New Employee"
                        />
                    )}
                    {pathname !== '/listemployees' && (
                        <NavButton
                            to="/listemployees"
                            icon={ListUsers}
                            alt="icon user list"
                            text="View Current Employees"
                        />
                    )}
                </nav>
            )}
        </header>
    );
}

export default Header;