import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const UniLoginPage = ({ setIsAuthenticated, setUserType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`http://127.0.0.1:8000/UniLogin?name=${encodeURIComponent(formData.name)}&password=${encodeURIComponent(formData.password)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.success) {
                setIsAuthenticated(true);
                setUserType('university');
                localStorage.setItem("universityId", data.id);
                localStorage.setItem("userType", 'university');
                navigate('/college-profile');
            } else {
                setError(data.message || "Invalid college name or password");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>College Login</h2>
                <p className="subtitle">Welcome back to EduWise</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="College Name"
                            value={formData.name}
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
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="auth-link">
                    Don't have an account? <span onClick={() => navigate('/college-signup')}>Create College Account</span>
                </p>
            </div>
        </div>
    );
};

export default UniLoginPage; 