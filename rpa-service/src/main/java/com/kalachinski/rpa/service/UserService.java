package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User register(User user);

    //todo unused method
//    List<UserDto> findAll();

    User findByEmail(String email);

    List<User> findAllTelegramBotUser();

    Optional<User> findByTelegramBotUserId(Long id);

    User save(User user);

    void activate(String id, String email);
}
