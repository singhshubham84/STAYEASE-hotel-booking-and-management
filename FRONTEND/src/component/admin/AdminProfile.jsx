import React, { useState, useEffect } from 'react';

import ApiService from '../../service/ApiService';
import "./ProfilePage.css";
import profileIcon from '../../asset/images/profile.png'; // Update the path accordingly


const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
 

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

   
    return (
        <div className="admin-profile">
            <div className="profile-header">
                <h1>Admin Profile</h1>
            </div>
            {error && <p className="error-message">{error}</p>}
            {admin && (
                <div className="profile-container">
                    <div className="profile-picture">
                        <img src={profileIcon} alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <p><strong>Name:</strong> {admin.name}</p>
                        <p><strong>Email:</strong> {admin.email}</p>
                        <p><strong>Phone Number:</strong> {admin.phoneNumber}</p>
                    </div>
                </div>
            )}
            {/* <div className="profile-actions">
               
                <button className="action-button " onClick={handleDeleteProfile}>
                    <FaTrashAlt className="action-icon" /> Delete Profile
                </button>
            </div> */}
        </div>
    );
};

export default AdminProfile;
