import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import styles from './Navbar.module.css';

// Functional component with props (Unit 2)
// Routing with React Router (Unit 4)
const Navbar = () => {
    const { theme, toggleTheme } = useAppContext();

    return (
        <nav className={`${styles.navbar} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={styles.logo}>
                <NavLink to="/">MovieMatch</NavLink>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/movies" className={({ isActive }) => isActive ? styles.active : ''}>
                        Movies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.active : ''}>
                        Favorites
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/feedback" className={({ isActive }) => isActive ? styles.active : ''}>
                        Feedback
                    </NavLink>
                </li>
            </ul>
            <button onClick={toggleTheme} className={styles.themeToggle}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </nav>
    );
};

export default Navbar;
