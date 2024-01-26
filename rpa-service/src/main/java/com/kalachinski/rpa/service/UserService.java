package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.User;

public interface UserService {

    User register(User user);

    //todo unused method
//    List<UserDto> findAll();

    User findByEmail(String email);

}
