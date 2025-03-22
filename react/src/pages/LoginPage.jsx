import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, accept any input and navigate to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome Back!</h2>
                <p className="subtitle">Log in to access your personalized college recommendations.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <div className="auth-footer">
                    <p>New to StudWeb?</p>
                    <button 
                        className="auth-link-button"
                        onClick={() => navigate('/signup')}
                    >
                        Create an Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
