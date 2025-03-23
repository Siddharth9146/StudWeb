import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ initialData, onSubmit, isEditing }) => {
    const [formData, setFormData] = useState(initialData || {
        fullName: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        yearOfStudy: '',
        interests: '',
        bio: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Profile' : 'Complete Your Profile'}</h2>
            
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="college">Current/Last College</label>
                <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="course">Course</label>
                <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="yearOfStudy">Year of Study</label>
                <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="graduated">Graduated</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="interests">Interests/Hobbies</label>
                <textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    rows="3"
                />
            </div>

            <div className="form-group">
                <label htmlFor="bio">About Me</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                />
            </div>

            <button type="submit" className="submit-btn">
                {isEditing ? 'Save Changes' : 'Create Profile'}
            </button>
        </form>
    );
};

export default ProfileForm; 