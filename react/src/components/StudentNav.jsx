import React from 'react';
import { NavLink } from 'react-router-dom';
import './StudentNav.css';

const StudentNav = () => {
    return (
        <nav className="secondary-nav">
            <ul>
                <li>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/learning-path" className={({ isActive }) => isActive ? 'active' : ''}>
                        Learning Path
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/college-list" className={({ isActive }) => isActive ? 'active' : ''}>
                        Colleges
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default StudentNav; 