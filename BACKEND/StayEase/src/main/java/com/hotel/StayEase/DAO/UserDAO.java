package com.hotel.StayEase.DAO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDAO {

    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String age;
    private String role;
    private List<BookingDAO> bookings = new ArrayList<>();

}
