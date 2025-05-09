import { NavLink } from 'react-router-dom';
import './navButton.scss';

const NavButton = ({ to, icon, alt = '', text, className = '', type, onClick }) => {
    const isButton = type === 'submit' || type === 'button';

    const content = (
        <>
            {icon && (
                <img
                    width="24px"
                    height="24px"
                    src={icon}
                    alt={alt}
                    className="icon"
                    title={text}
                    loading="lazy"
                />
            )}
            <span className="btntext">{text}</span>
        </>
    );

    return isButton ? (
        <button type={type} className={`btn ${className}`} onClick={onClick}>
            {content}
        </button>
    ) : (
        <NavLink to={to || '#'} className={`btn ${className}`} onClick={onClick}>
            {content}
        </NavLink>
    );
};

export default NavButton;