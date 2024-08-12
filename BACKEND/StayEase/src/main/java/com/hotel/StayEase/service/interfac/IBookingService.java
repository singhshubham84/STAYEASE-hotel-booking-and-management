package com.hotel.StayEase.service.interfac;

import com.hotel.StayEase.DAO.Response;
import com.hotel.StayEase.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}
