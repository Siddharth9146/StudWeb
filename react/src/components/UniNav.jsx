import React from 'react';
import { NavLink } from 'react-router-dom';
import './UniNav.css';

const UniNav = () => {
    return (
        <nav className="secondary-nav">
            <ul>
                <li>
                    <NavLink to="/college-profile" className={({ isActive }) => isActive ? 'active' : ''}>
                        College Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/applications" className={({ isActive }) => isActive ? 'active' : ''}>
                        Applications
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
                        Analytics
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default UniNav; 