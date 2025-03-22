import React, { useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard</h1>

            {isLoggedIn && (
                <div className="dashboard-nav">
                    <button>Profile</button>
                    <button>Search College</button>
                    <button>Learning Path</button>
                </div>
            )}

            <div className="dashboard-content">
                <div className="dashboard-card">
                    <h2>Your Profile</h2>
                    <p>Complete your profile to get personalized college recommendations</p>
                </div>
                <div className="dashboard-card">
                    <h2>College Matches</h2>
                    <p>View your personalized college matches</p>
                </div>
                <div className="dashboard-card">
                    <h2>Saved Colleges</h2>
                    <p>Your saved colleges will appear here</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;