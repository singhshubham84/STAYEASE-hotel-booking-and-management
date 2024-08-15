import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import { FaUser } from 'react-icons/fa';
const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();
    const handleLogout = () => {
        ApiService.logout(); // Call logout method from ApiService
        navigate('/home');  // Redirect to home or login page after logout
    };
    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <div className="background-image"></div> {/* Add this for the background image */}
            <div className="admin-container">
                <div className="sidebar">
                    <h2 className="sidebar-heading">
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </h2>
                    <button className="sidebar-button" onClick={() => navigate('/admin/manage-rooms')}>
                        <i className="fas fa-bed"></i> Manage Rooms
                    </button>
                    <button className="sidebar-button" onClick={() => navigate('/admin/manage-bookings')}>
                        <i className="fas fa-calendar-check"></i> Manage Bookings
                    </button>
                    <button className="sidebar-button profile-button" onClick={() => navigate('/admin/profile')}>
                        <FaUser className="button-icon" /> Profile
                    </button>
                    {/* <button className="sidebar-button" onClick={() => navigate('/admin/edit-profile')}>
                    <i className="fa fa-edit"></i> Edit Profile
                </button> */}
                <button className="sidebar-button " onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i> Logout
                </button>


                </div>
                <div className="admin-content">
                    <h1 className="welcome-message">Welcome, Admin</h1>
                    {/* Additional content can be added here */}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
