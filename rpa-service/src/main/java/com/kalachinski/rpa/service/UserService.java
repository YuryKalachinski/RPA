package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.UserRepo;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

}
