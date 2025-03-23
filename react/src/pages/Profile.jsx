import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        tenthGrade: '',
        twelfthGrade: '',
        examType: '',
        examScore: '',
        preferredCourses: [],
        wantedFacilities: [],
        state: ''
    });

    const [errors, setErrors] = useState({});
    const [examTypes, setExamTypes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        const fetchExamNames = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/names");
                if (response.ok) {
                    const data = await response.json();
                    setExamTypes(data || []);
                } else {
                    // Fallback exam types if API fails
                    setExamTypes(['JEE Main', 'JEE Advanced', 'NEET', 'BITSAT', 'VITEEE']);
                }
            } catch (error) {
                console.error("Error fetching exam names:", error);
                // Fallback exam types if API fails
                setExamTypes(['JEE Main', 'JEE Advanced', 'NEET', 'BITSAT', 'VITEEE']);
            }
        };

        const fetchStudentData = async () => {
            const studentId = localStorage.getItem('studentId');
            if (!studentId) {
                setHasProfile(false);
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/StudInfo/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        name: data.name || '',
                        phone: data.phone || '',
                        tenthGrade: data.tenth_grade || '',
                        twelfthGrade: data.twelfth_grade || '',
                        examType: data.exam_name || '',
                        examScore: data.exam_score || '',
                        preferredCourses: data.preferred_degree ? data.preferred_degree.split(', ') : [],
                        wantedFacilities: data.wanted_facilities || [],
                        state: data.state || ''
                    });
                    setHasProfile(true);
                    setIsEditing(false);
                } else {
                    setHasProfile(false);
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
                setHasProfile(false);
            }
        };

        fetchExamNames();
        fetchStudentData();
    }, []);

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

        if (!formData.tenthGrade.toString().trim()) {
            newErrors.tenthGrade = '10th grade score is required';
        } else if (isNaN(formData.tenthGrade) || formData.tenthGrade < 0 || formData.tenthGrade > 100) {
            newErrors.tenthGrade = 'Please enter a valid score between 0 and 100';
        }

        if (!formData.twelfthGrade.toString().trim()) {
            newErrors.twelfthGrade = '12th grade score is required';
        } else if (isNaN(formData.twelfthGrade) || formData.twelfthGrade < 0 || formData.twelfthGrade > 100) {
            newErrors.twelfthGrade = 'Please enter a valid score between 0 and 100';
        }

        if (!formData.examType) {
            newErrors.examType = 'Please select an exam type';
        }

        if (!formData.examScore.toString().trim()) {
            newErrors.examScore = 'Exam score is required';
        } else if (isNaN(formData.examScore)) {
            newErrors.examScore = 'Please enter a valid score';
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }

        if (formData.preferredCourses.length === 0) {
            newErrors.preferredCourses = 'Please select at least one course';
        }

        if (formData.wantedFacilities.length === 0) {
            newErrors.wantedFacilities = 'Please select at least one facility';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const studentData = {
            name: formData.name,
            phone: formData.phone,
            tenth_grade: parseInt(formData.tenthGrade),
            twelfth_grade: parseInt(formData.twelfthGrade),
            exam_score: parseInt(formData.examScore),
            exam_name: formData.examType,
            state: formData.state,
            preferred_degree: formData.preferredCourses.join(", "),
            wanted_facilities: formData.wantedFacilities
        };

        try {
            const studentId = localStorage.getItem('studentId');
            const url = studentId 
                ? `http://127.0.0.1:8000/StudInfoUpdate/${studentId}`
                : "http://127.0.0.1:8000/StudInfoPost";

            const response = await fetch(url, {
                method: studentId ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                setHasProfile(true);
                setIsEditing(false);
                if (!hasProfile) {
                    // Redirect to dashboard after first-time profile completion
                    navigate('/dashboard');
                }
            } else {
                const errorData = await response.json();
                alert(errorData.detail || "Failed to save profile. Please try again.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (!hasProfile || isEditing) {
        return (
            <div className="profile-container">
                <h1>{hasProfile ? 'Edit Profile' : 'Complete Your Profile'}</h1>
                {!hasProfile && (
                    <div className="info-message">
                        Please complete your profile to continue
                    </div>
                )}
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
                        <label htmlFor="state">State *</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={errors.state ? 'error' : ''}
                        />
                        {errors.state && <span className="error-message">{errors.state}</span>}
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
                        <label>Preferred Courses *</label>
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
                        {errors.preferredCourses && <span className="error-message">{errors.preferredCourses}</span>}
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

                    <button type="submit" className="submit-btn">
                        {hasProfile ? 'Save Changes' : 'Create Profile'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>My Profile</h1>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    Edit Profile
                </button>
            </div>
            <div className="profile-info">
                <div className="info-group">
                    <h3>Personal Information</h3>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>State:</strong> {formData.state}</p>
                </div>

                <div className="info-group">
                    <h3>Academic Information</h3>
                    <p><strong>10th Grade Score:</strong> {formData.tenthGrade}%</p>
                    <p><strong>12th Grade Score:</strong> {formData.twelfthGrade}%</p>
                    <p><strong>Exam Type:</strong> {formData.examType}</p>
                    <p><strong>Exam Score:</strong> {formData.examScore}</p>
                </div>

                <div className="info-group">
                    <h3>Preferences</h3>
                    <p><strong>Preferred Courses:</strong> {formData.preferredCourses.join(", ")}</p>
                    <p><strong>Wanted Facilities:</strong> {formData.wantedFacilities.join(", ")}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;