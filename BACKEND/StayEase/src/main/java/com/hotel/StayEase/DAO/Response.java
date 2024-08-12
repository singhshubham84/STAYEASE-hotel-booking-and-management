package com.hotel.StayEase.DAO;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private String bookingConfirmationCode;

    private UserDAO user;
    private RoomDAO room;
    private BookingDAO booking;
    private List<UserDAO> userList;
    private List<RoomDAO> roomList;
    private List<BookingDAO> bookingList;


}
