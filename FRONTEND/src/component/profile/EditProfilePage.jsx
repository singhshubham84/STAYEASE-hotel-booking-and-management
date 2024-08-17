import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './Profile.css';

const EditProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        phoneNumber: '',
        age:''
    });

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUser(userId);

                setUserDetails({
                    name: response.user.name,
                    age: response.user.age,
                    phoneNumber: response.user.phoneNumber
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userDetails.name);
            formData.append('age', userDetails.age);
            formData.append('phoneNumber', userDetails.phoneNumber);

           const result= await ApiService.updateUser(userId,formData);
           if (result.statusCode === 200) {
            setSuccess('Profile updated successfully.');
            
            setTimeout(() => {
                setSuccess('');
                navigate('/profile');
            }, 2000);
        }
    } catch (error) {
        setError(error.response?.data?.message || error.message);
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
            {success && <p className="success-message">{success}</p>}
           
                <div className="profile-details">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="age"
                            value={userDetails.age}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userDetails.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <button
                        className="update-profile-button"
                        onClick={() => handleUpdate(userDetails)}
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
            
        </div>
    );
   
};

export default EditProfilePage;