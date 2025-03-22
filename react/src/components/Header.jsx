import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo-container" onClick={() => navigate('/')}>
                <svg className="logo-icon" viewBox="0 0 100 100" width="24" height="24">
                    <path
                        fill="none"
                        stroke="#FFA500"
                        strokeWidth="8"
                        d="M50 10 L61 39 L92 39 L67 57 L78 86 L50 68 L22 86 L33 57 L8 39 L39 39 Z"
                    />
                </svg>
                <span className="logo-text">EduWise</span>
            </div>
            <nav>
                <ul>
                    <li 
                        className={isActive('/') ? 'active' : ''} 
                        onClick={() => navigate('/')}
                    >
                        Home
                    </li>
                    <li 
                        className={isActive('/college-list') ? 'active' : ''} 
                        onClick={() => navigate('/college-list')}
                    >
                        All Colleges
                    </li>
                    <li 
                        className={isActive('/contact') ? 'active' : ''} 
                        onClick={() => navigate('/contact')}
                    >
                        Contact
                    </li>
                    {!isAuthenticated && (
                        <>
                            <li 
                                className={isActive('/login') ? 'active' : ''} 
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </li>
                            <li 
                                className={isActive('/signup') ? 'active' : ''} 
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
