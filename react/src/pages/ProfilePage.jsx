import React, { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import './ProfilePage.css';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const studentId = localStorage.getItem('studentId');
                if (!studentId) {
                    setIsFirstTime(true);
                    return;
                }

                const response = await fetch(`http://127.0.0.1:8000/StudInfo/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        fullName: data.name,
                        email: data.email || '',
                        phone: data.phone,
                        college: data.college || '',
                        course: data.preferred_degree,
                        yearOfStudy: data.year_of_study || '',
                        interests: data.interests || '',
                        bio: data.bio || ''
                    });
                    setIsFirstTime(false);
                } else {
                    setError('Failed to fetch profile data');
                    setIsFirstTime(true);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Error loading profile data');
                setIsFirstTime(true);
            }
        };

        fetchProfileData();
    }, []);

    const handleProfileSubmit = async (data) => {
        try {
            const studentId = localStorage.getItem('studentId');
            const response = await fetch('http://127.0.0.1:8000/StudInfoPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: studentId,
                    name: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    college: data.college,
                    preferred_degree: data.course,
                    year_of_study: data.yearOfStudy,
                    interests: data.interests,
                    bio: data.bio
                })
            });

            if (response.ok) {
                setProfileData(data);
                setIsEditing(false);
                setIsFirstTime(false);
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to save profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            setError('Error saving profile data');
        }
    };

    if (error) {
        return (
            <div className="profile-page">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (isFirstTime || isEditing) {
        return (
            <div className="profile-page">
                <ProfileForm
                    initialData={profileData}
                    onSubmit={handleProfileSubmit}
                    isEditing={isEditing}
                />
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-display">
                <div className="profile-header">
                    <h2>My Profile</h2>
                    <button 
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="profile-info">
                    <div className="info-group">
                        <h3>Personal Information</h3>
                        <p><strong>Name:</strong> {profileData.fullName}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Phone:</strong> {profileData.phone}</p>
                    </div>

                    <div className="info-group">
                        <h3>Academic Information</h3>
                        <p><strong>College:</strong> {profileData.college}</p>
                        <p><strong>Course:</strong> {profileData.course}</p>
                        <p><strong>Year of Study:</strong> {
                            profileData.yearOfStudy === 'graduated' 
                                ? 'Graduated' 
                                : `${profileData.yearOfStudy}${
                                    profileData.yearOfStudy === '1' ? 'st' :
                                    profileData.yearOfStudy === '2' ? 'nd' :
                                    profileData.yearOfStudy === '3' ? 'rd' : 'th'
                                } Year`
                        }</p>
                    </div>

                    <div className="info-group">
                        <h3>Additional Information</h3>
                        <p><strong>Interests:</strong> {profileData.interests}</p>
                        <p><strong>About Me:</strong> {profileData.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 