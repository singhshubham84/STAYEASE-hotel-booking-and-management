import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';


const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    const filterBookings = useCallback((term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    }, [bookings]);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, filterBookings]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='manage-bookings-page'>
            <div className='content-container'>
                <h2 className='page-title'>Manage Bookings</h2>
                <div className='search-div'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by Booking Number"
                        className='search-input'
                    />
                </div>

             <div className="booking-result">
                    {currentBookings.map((booking) => (
                        <div key={booking.id} className="booking-cards">
                            <div className="booking-infos">
                                <div className="booking-headers">
                                    <p className="booking-codes">#{booking.bookingConfirmationCode}</p>
                                    <button
                                        className="manage-booking-buttons"
                                        onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                    >Manage</button>
                                </div>
                                <div className="booking-detail">
                                    <p><strong>Check-In:</strong> {booking.checkInDate}</p>
                                    <p><strong>Check-Out:</strong> {booking.checkOutDate}</p>
                                    <p><strong>Guests:</strong> {booking.totalNumOfGuest}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    roomsPerPage={bookingsPerPage}
                    totalRooms={filteredBookings.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default ManageBookingsPage;
