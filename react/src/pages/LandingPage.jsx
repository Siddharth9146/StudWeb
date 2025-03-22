import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <section className="hero">
                <h1>Your Future Starts Here</h1>
                <p>Smart college matches for students - Targeted recruitment for institutions</p>
                <div className="cta-segment">
                    <button className="student-cta">I'm a Student</button>
                    <button className="college-cta">I'm a College</button>
                </div>
            </section>
            <section className="features">
                <h2>Why Choose StudWeb?</h2>
                <div className="feature-grid">
                    <div className="feature-item">
                        <h3>AI-Powered Matching</h3>
                        <p>Get personalized college suggestions based on your unique profile.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Scholarship Tracking</h3>
                        <p>Never miss an opportunity with our comprehensive scholarship dashboard.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Career Insights</h3>
                        <p>Explore potential career paths aligned with your interests and skills.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
