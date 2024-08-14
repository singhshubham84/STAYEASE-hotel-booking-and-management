import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import "./ProfilePage.css";
const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdmin(response.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchAdminProfile();
    }, []);



    const handleDeleteProfile = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                await ApiService.deleteUser(admin.id);
                navigate('/home');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="profile-page">
            <h2>Welcome, {admin ? admin.name : 'Admin'}</h2>
            
            {error && <p className="error-message">{error}</p>}
            {admin && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Name:</strong> {admin.name}</p>
                    <p><strong>Email:</strong> {admin.email}</p>
                    <p><strong>Phone Number:</strong> {admin.phoneNumber}</p>
                </div>
            )}
            <div className="profile-actions">
                {/* <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                <button className="change-password-button" onClick={handleChangePassword}>Change Password</button> */}
                <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
                
            </div>
        </div>
    );
};

export default AdminProfile;
