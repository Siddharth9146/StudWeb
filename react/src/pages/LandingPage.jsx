import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Perfect College Match</h1>
                    <p className="hero-subtitle">
                        Discover the best colleges that match your aspirations. Get personalized recommendations, 
                        compare programs, and make informed decisions about your educational future.
                    </p>
                    <div className="cta-buttons">
                        <button className="primary-cta" onClick={() => navigate('/login')}>
                            I'm a Student
                        </button>
                        <button className="secondary-cta" onClick={() => navigate('/signup')}>
                            College Representative
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="floating-elements">
                        <div className="floating-card card1">
                            <span className="icon">🎓</span>
                            <h3>Top Universities</h3>
                        </div>
                        <div className="floating-card card2">
                            <span className="icon">📚</span>
                            <h3>Diverse Courses</h3>
                        </div>
                        <div className="floating-card card3">
                            <span className="icon">🎯</span>
                            <h3>Perfect Match</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>Why Choose EduWise?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Smart Matching</h3>
                        <p>Get personalized college recommendations based on your preferences and academic profile.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Comprehensive Data</h3>
                        <p>Access detailed information about colleges, courses, and admission requirements.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>Direct Connect</h3>
                        <p>Connect directly with college representatives and get your questions answered.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Easy to Use</h3>
                        <p>Simple and intuitive interface to make your college search hassle-free.</p>
                    </div>
                </div>
            </section>

            <section className="stats">
                <div className="stat-item">
                    <h3>1000+</h3>
                    <p>Colleges Listed</p>
                </div>
                <div className="stat-item">
                    <h3>50K+</h3>
                    <p>Students Helped</p>
                </div>
                <div className="stat-item">
                    <h3>95%</h3>
                    <p>Success Rate</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
