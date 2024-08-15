package com.hotel.StayEase.utils;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

import com.hotel.StayEase.DAO.BookingDAO;
import com.hotel.StayEase.DAO.RoomDAO;
import com.hotel.StayEase.DAO.UserDAO;
import com.hotel.StayEase.entity.Booking;
import com.hotel.StayEase.entity.Room;
import com.hotel.StayEase.entity.User;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();


    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }


    public static UserDAO mapUserEntityToUserDAO(User user) {
        UserDAO userDAO = new UserDAO();

        userDAO.setId(user.getId());
        userDAO.setName(user.getName());
        userDAO.setAge(user.getAge());
        userDAO.setEmail(user.getEmail());
        userDAO.setPhoneNumber(user.getPhoneNumber());
        userDAO.setRole(user.getRole());
        return userDAO;
    }

    public static RoomDAO mapRoomEntityToRoomDAO(Room room) {
        RoomDAO roomDAO = new RoomDAO();

        roomDAO.setId(room.getId());
        roomDAO.setRoomType(room.getRoomType());
        roomDAO.setRoomPrice(room.getRoomPrice());
        roomDAO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDAO.setRoomDescription(room.getRoomDescription());
        return roomDAO;
    }

    public static BookingDAO mapBookingEntityToBookingDAO(Booking booking) {
        BookingDAO bookingDAO = new BookingDAO();
        // Map simple fields
        bookingDAO.setId(booking.getId());
        bookingDAO.setCheckInDate(booking.getCheckInDate());
        bookingDAO.setCheckOutDate(booking.getCheckOutDate());
        bookingDAO.setNumOfAdults(booking.getNumOfAdults());
        bookingDAO.setNumOfChildren(booking.getNumOfChildren());
        bookingDAO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDAO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDAO;
    }

    public static RoomDAO mapRoomEntityToRoomDAOPlusBookings(Room room) {
        RoomDAO roomDAO = new RoomDAO();

        roomDAO.setId(room.getId());
        roomDAO.setRoomType(room.getRoomType());
        roomDAO.setRoomPrice(room.getRoomPrice());
        roomDAO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDAO.setRoomDescription(room.getRoomDescription());

        if (room.getBookings() != null) {
            roomDAO.setBookings(room.getBookings().stream().map(Utils::mapBookingEntityToBookingDAO).collect(Collectors.toList()));
        }
        return roomDAO;
    }

    public static BookingDAO mapBookingEntityToBookingDAOPlusBookedRooms(Booking booking, boolean mapUser) {

        BookingDAO bookingDAO = new BookingDAO();
        // Map simple fields
        bookingDAO.setId(booking.getId());
        bookingDAO.setCheckInDate(booking.getCheckInDate());
        bookingDAO.setCheckOutDate(booking.getCheckOutDate());
        bookingDAO.setNumOfAdults(booking.getNumOfAdults());
        bookingDAO.setNumOfChildren(booking.getNumOfChildren());
        bookingDAO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDAO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if (mapUser) {
            bookingDAO.setUser(Utils.mapUserEntityToUserDAO(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            RoomDAO roomDAO = new RoomDAO();

            roomDAO.setId(booking.getRoom().getId());
            roomDAO.setRoomType(booking.getRoom().getRoomType());
            roomDAO.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDAO.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            roomDAO.setRoomDescription(booking.getRoom().getRoomDescription());
            bookingDAO.setRoom(roomDAO);
        }
        return bookingDAO;
    }

    public static UserDAO mapUserEntityToUserDAOPlusUserBookingsAndRoom(User user) {
        UserDAO userDAO = new UserDAO();

        userDAO.setId(user.getId());
        userDAO.setName(user.getName());
        userDAO.setAge(user.getAge());
        userDAO.setEmail(user.getEmail());
        userDAO.setPhoneNumber(user.getPhoneNumber());
        userDAO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDAO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDAOPlusBookedRooms(booking, false)).collect(Collectors.toList()));
        }
        return userDAO;
    }


    public static List<UserDAO> mapUserListEntityToUserListDAO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDAO).collect(Collectors.toList());
    }

    public static List<RoomDAO> mapRoomListEntityToRoomListDAO(List<Room> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomDAO).collect(Collectors.toList());
    }

    public static List<BookingDAO> mapBookingListEntityToBookingListDAO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDAO).collect(Collectors.toList());
    }


}


