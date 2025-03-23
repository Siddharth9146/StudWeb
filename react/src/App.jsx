import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import StudentNav from './components/StudentNav';
import UniNav from './components/UniNav';
import LandingPage from './pages/LandingPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentSignupPage from './pages/StudentSignupPage';
import UniLoginPage from './pages/UniLoginPage';
import UniSignupPage from './pages/UniSignupPage';
import CollegeList from './pages/CollegeList';
import Profile from './pages/Profile';
import UniversityProfile from './pages/UniversityProfile';
import LearningPath from './pages/LearningPath';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null); // 'student' or 'university'
    const location = useLocation();
    
    const isAuthPage = location.pathname === '/student-login' || 
                      location.pathname === '/student-signup' || 
                      location.pathname === '/college-login' || 
                      location.pathname === '/college-signup';
    const isLandingPage = location.pathname === '/';

    // Show StudentNav for authenticated students except on landing and auth pages
    const showStudentNav = isAuthenticated && 
                          userType === 'student' && 
                          !isAuthPage && 
                          !isLandingPage;

    // Show UniNav for authenticated universities except on landing and auth pages
    const showUniNav = isAuthenticated && 
                      userType === 'university' && 
                      !isAuthPage && 
                      !isLandingPage;

    return (
        <div className="app">
            <Header />
            {showStudentNav && <StudentNav />}
            {showUniNav && <UniNav />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/student-login" element={<StudentLoginPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
                <Route path="/student-signup" element={<StudentSignupPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
                <Route path="/college-login" element={<UniLoginPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
                <Route path="/college-signup" element={<UniSignupPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
                <Route path="/profile" element={isAuthenticated && userType === 'student' ? <Profile /> : <Navigate to="/student-login" />} />
                <Route path="/college-profile" element={isAuthenticated && userType === 'university' ? <UniversityProfile /> : <Navigate to="/college-login" />} />
                <Route path="/college-list" element={<CollegeList />} />
                <Route path="/learning-path" element={isAuthenticated && userType === 'student' ? <LearningPath /> : <Navigate to="/student-login" />} />
            </Routes>
        </div>
    );
};

export default App;
