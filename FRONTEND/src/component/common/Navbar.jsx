import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import logo from '../../asset/images/logo.png';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to log out?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light px-5 shadow-sm sticky-top">
            <div className="navbar-brand">
                <NavLink to="/home" className="navbar-brand">
                    <img src={logo} alt="StayEase Logo" />
                </NavLink>
            </div>
            <div className="navbar-toggler-icon" onClick={toggleMenu}>
                <span className="navbar-toggler-icon-bar"></span>
                <span className="navbar-toggler-icon-bar"></span>
                <span className="navbar-toggler-icon-bar"></span>
            </div>
            <ul className={`navbar-ul ${isMenuOpen ? 'open' : ''}`}>
                <li><NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
                <li><NavLink to="/rooms" className={({ isActive }) => (isActive ? "active" : "")}>Rooms</NavLink></li>
                <li><NavLink to="/find-booking" className={({ isActive }) => (isActive ? "active" : "")}>Find my Booking</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink></li>
                {isUser && <li><NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>Admin</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink></li>}
                {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
