import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SecondaryNav from './components/SecondaryNav';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CollegeList from './pages/CollegeList';
import Profile from './pages/Profile';
import LearningPath from './pages/LearningPath';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isLandingPage = location.pathname === '/';
    const isCollegeList = location.pathname === '/college-list';

    return (
        <div className="app">
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            {isAuthenticated && !isAuthPage && !isLandingPage && !isCollegeList && <SecondaryNav />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/college-list" element={<CollegeList />} />
                <Route path="/learning-path" element={isAuthenticated ? <LearningPath /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
};

export default App;
