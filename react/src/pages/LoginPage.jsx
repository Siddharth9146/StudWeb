import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/StudLogin?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.success) {
                setIsAuthenticated(true);
                localStorage.setItem("studentId", data.id); // Store student ID if needed
                navigate('/profile');
            } else {
                setError(data.message || "Invalid username or password.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="auth-link">
                    Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
