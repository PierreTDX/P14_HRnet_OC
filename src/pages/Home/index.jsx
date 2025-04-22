import './home.scss';
import useInitEmployees from '../../hooks/useInitEmployees';
import AddUser from '../../assets/img/addUserWhite.webp';
import ListUsers from '../../assets/img/listUsersWhite.webp';
import NavButton from '../../components/NavButton';

function Home() {
    useInitEmployees();

    return (
        <main className="home">
            <h1>Welcome to your employee records management system</h1>
            <nav className="navHome">
                <NavButton
                    to="/createemployee"
                    icon={AddUser}
                    alt="icon add user"
                    text="Add New Employee"
                    className="btnHome"
                />
                <NavButton
                    to="/listemployees"
                    icon={ListUsers}
                    alt="icon user list"
                    text="View Current Employees"
                    className="btnHome"
                />
            </nav>

        </main>
    );
}

export default Home;