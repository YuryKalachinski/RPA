package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.User;

import java.util.List;

public interface UserService {

    User register(User user);

    List<User> findAllUsers();

    User findByEmail(String email);

}
