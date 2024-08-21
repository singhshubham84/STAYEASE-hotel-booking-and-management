package com.hotel.StayEase.service.interfac;

import com.hotel.StayEase.DAO.LoginRequest;
import com.hotel.StayEase.DAO.Response;
import com.hotel.StayEase.entity.User;


public interface IUserService {
	
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

	Response updateUser(Long userId, String name, String age, String phoneNumber);

}
