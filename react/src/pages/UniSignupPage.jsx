import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const UniSignupPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        state: ''
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
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/UniSignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    password: formData.password,
                    state: formData.state
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                localStorage.setItem('universityId', data.id);
                // Show success message before redirecting
                setError('');
                // Redirect to university profile completion page
                navigate('/college-profile');
            } else {
                setError(data.detail || data.message || 'Failed to create account');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create College Account</h2>
                <p className="subtitle">Join EduWise to connect with potential students</p>
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
                            minLength={6}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create College Account'}
                    </button>
                </form>
                <p className="auth-link">
                    Already have an account? <span onClick={() => navigate('/college-login')}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default UniSignupPage; 