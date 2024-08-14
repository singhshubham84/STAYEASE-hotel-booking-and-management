import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './Profile.css';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                setUpdatedUser({
                    name: response.user.name,
                    email: response.user.email,
                    phoneNumber: response.user.phoneNumber
                });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value
        });
    };

    const handleUpdateProfile = async (updatedUserData) => {
        try {
            await ApiService.updateUserProfile(updatedUserData);
            // Optionally, show success message or redirect
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedUser.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button
                        className="update-profile-button"
                        onClick={() => handleUpdateProfile(updatedUser)}
                    >
                        Update Profile
                    </button>
                    <button
                        className="delete-profile-button"
                        onClick={handleDeleteProfile}
                    >
                        Delete Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProfilePage;
