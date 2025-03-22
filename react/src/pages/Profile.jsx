import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        tenthGrade: '',
        twelfthGrade: '',
        examType: '',
        examScore: '',
        preferredCourses: [],
        wantedFacilities: []
    });

    const [errors, setErrors] = useState({});

    const examTypes = [
        'JEE Main',
        'JEE Advanced',
        'NEET',
        'GATE',
        'CAT',
        'Other'
    ];

    const courseOptions = [
        'Computer Science',
        'Electronics',
        'Mechanical',
        'Civil',
        'Chemical',
        'Aerospace',
        'Biotechnology',
        'Information Technology'
    ];

    const facilityOptions = [
        'Hostel',
        'Sports Complex',
        'Library',
        'Research Labs',
        'Placement Cell',
        'Cafeteria',
        'Medical Facility',
        'Transportation'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked 
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.tenthGrade.trim()) {
            newErrors.tenthGrade = '10th grade score is required';
        } else if (isNaN(formData.tenthGrade) || formData.tenthGrade < 0 || formData.tenthGrade > 100) {
            newErrors.tenthGrade = 'Please enter a valid score between 0 and 100';
        }

        if (!formData.twelfthGrade.trim()) {
            newErrors.twelfthGrade = '12th grade score is required';
        } else if (isNaN(formData.twelfthGrade) || formData.twelfthGrade < 0 || formData.twelfthGrade > 100) {
            newErrors.twelfthGrade = 'Please enter a valid score between 0 and 100';
        }

        if (!formData.examType) {
            newErrors.examType = 'Please select an exam type';
        }

        if (!formData.examScore.trim()) {
            newErrors.examScore = 'Exam score is required';
        } else if (isNaN(formData.examScore)) {
            newErrors.examScore = 'Please enter a valid score';
        }

        if (formData.wantedFacilities.length === 0) {
            newErrors.wantedFacilities = 'Please select at least one facility';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className="profile-container">
            <h1>Student Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="tenthGrade">10th Grade Score (%) *</label>
                    <input
                        type="number"
                        id="tenthGrade"
                        name="tenthGrade"
                        value={formData.tenthGrade}
                        onChange={handleChange}
                        className={errors.tenthGrade ? 'error' : ''}
                    />
                    {errors.tenthGrade && <span className="error-message">{errors.tenthGrade}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="twelfthGrade">12th Grade Score (%) *</label>
                    <input
                        type="number"
                        id="twelfthGrade"
                        name="twelfthGrade"
                        value={formData.twelfthGrade}
                        onChange={handleChange}
                        className={errors.twelfthGrade ? 'error' : ''}
                    />
                    {errors.twelfthGrade && <span className="error-message">{errors.twelfthGrade}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="examType">Exam Type *</label>
                    <select
                        id="examType"
                        name="examType"
                        value={formData.examType}
                        onChange={handleChange}
                        className={errors.examType ? 'error' : ''}
                    >
                        <option value="">Select Exam Type</option>
                        {examTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.examType && <span className="error-message">{errors.examType}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="examScore">Exam Score *</label>
                    <input
                        type="number"
                        id="examScore"
                        name="examScore"
                        value={formData.examScore}
                        onChange={handleChange}
                        className={errors.examScore ? 'error' : ''}
                    />
                    {errors.examScore && <span className="error-message">{errors.examScore}</span>}
                </div>

                <div className="form-group">
                    <label>Preferred Courses</label>
                    <div className="checkbox-group">
                        {courseOptions.map(course => (
                            <label key={course} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="preferredCourses"
                                    value={course}
                                    checked={formData.preferredCourses.includes(course)}
                                    onChange={handleCheckboxChange}
                                />
                                {course}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Wanted Facilities *</label>
                    <div className="checkbox-group">
                        {facilityOptions.map(facility => (
                            <label key={facility} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="wantedFacilities"
                                    value={facility}
                                    checked={formData.wantedFacilities.includes(facility)}
                                    onChange={handleCheckboxChange}
                                />
                                {facility}
                            </label>
                        ))}
                    </div>
                    {errors.wantedFacilities && <span className="error-message">{errors.wantedFacilities}</span>}
                </div>

                <button type="submit" className="submit-btn">Save Profile</button>
            </form>
        </div>
    );
};

export default Profile; 