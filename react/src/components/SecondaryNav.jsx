import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SecondaryNav.css';

const SecondaryNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="secondary-nav">
            <div className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
                onClick={() => navigate('/profile')}>
                Profile
            </div>
            <div className={`nav-item ${isActive('/college-list') ? 'active' : ''}`}
                onClick={() => navigate('/college-list')}>
                Search Colleges
            </div>
            <div className={`nav-item ${isActive('/learning-path') ? 'active' : ''}`}
                onClick={() => navigate('/learning-path')}>
                Learning Path
            </div>
        </nav>
    );
};

export default SecondaryNav; 