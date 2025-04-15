import './header.scss';
import Logo from '../../assets/img/logoNoBackground.webp';
import AddUser from '../../assets/img/addUserWhite.webp';
import ListUsers from '../../assets/img/listUsersWhite.webp';
import { NavLink, useLocation } from 'react-router-dom';
import NavButton from '../../components/NavButton';

function Header() {
    const { pathname } = useLocation();

    return (
        <header>
            <NavLink to="/" className="logo" title="Go Home">
                <img width="80px" height="80px" src={Logo} alt="logo" />
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