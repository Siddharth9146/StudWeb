import React from 'react';
import './LearningPath.css';

const LearningPath = () => {
    return (
        <div className="learning-path-container">
            <h1>Learning Path</h1>
            <div className="learning-path-content">
                <div className="path-section">
                    <h2>Your Personalized Learning Journey</h2>
                    <p>This section will help you track your academic progress and plan your educational path.</p>
                </div>
                
                <div className="path-section">
                    <h3>Coming Soon</h3>
                    <p>We're working on creating a personalized learning path for you based on your profile and goals.</p>
                </div>
            </div>
        </div>
    );
};

export default LearningPath; 