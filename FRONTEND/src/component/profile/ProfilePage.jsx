import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('profile'); // New state for section toggle
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate(`/edit-profile/${user.id}`);
    };


    return (
        <div className="profile-page">
            <div className="sidebar">
                <h2>My Profile</h2>
                <button onClick={() => setActiveSection('profile')} className={`sidebar-button ${activeSection === 'profile' ? 'active' : ''}`}>
                    Profile
                </button>
                <button onClick={() => setActiveSection('bookings')} className={`sidebar-button ${activeSection === 'bookings' ? 'active' : ''}`}>
                    Bookings
                </button>
                <button className="sidebar-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="profile-content">
                {error && <p className="error-message">{error}</p>}

                {activeSection === 'profile' && user && (
                    <div className="profile-details">
                        <h2>Welcome, {user.name}</h2>
                        <h3>My Profile Details</h3>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>age:</strong> {user.age}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                    </div>
                )}

                {activeSection === 'bookings' && user && (
                    <div className="bookings-section">
                        <h3>My Booking History</h3>
                        <div className="booking-list">
                            {user.bookings.length > 0 ? (
                                user.bookings.map((booking) => (
                                    <div key={booking.id} className="booking-item">
                                    <div className="booking-detailss">
                                        <div className="booking-detail-item">
                                            <h4>Booking Code:</h4>
                                            <p>{booking.bookingConfirmationCode}</p>
                                        </div>
                                        <div className="booking-detail-item">
                                            <h4>Check-in Date:</h4>
                                            <p>{booking.checkInDate}</p>
                                        </div>
                                        <div className="booking-detail-item">
                                            <h4>Check-out Date:</h4>
                                            <p>{booking.checkOutDate}</p>
                                        </div>
                                        <div className="booking-detail-item">
                                            <h4>Total Guests:</h4>
                                            <p>{booking.totalNumOfGuest}</p>
                                        </div>
                                        <div className="booking-detail-item">
                                            <h4>Room Type:</h4>
                                            <p>{booking.room.roomType}</p>
                                        </div>
                                        <div className="booking-detail-item">
                                            <h4>Room Price:</h4>
                                            <p>₹ {booking.room.roomPrice} / Night</p>
                                        </div>
                                      
                                    </div>
                                    <div className="room-photo-container">
                                        <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p>No bookings found.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
