import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>EduWise</div>
            <nav>
                <ul>
                    <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/college-list')}>All Colleges</li>
                    <li onClick={() => navigate('/contact')}>Contact</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
