import { NavLink } from 'react-router-dom';
import './navButton.scss';

const NavButton = ({ to, icon, alt, text, className = '' }) => {
    return (
        <NavLink to={to} className={`btn ${className}`}>
            <img width="24px" height="24px" src={icon} alt={alt} className="icon" title={text} />
            <span className="btntext">{text}</span>
        </NavLink>
    );
};

export default NavButton;