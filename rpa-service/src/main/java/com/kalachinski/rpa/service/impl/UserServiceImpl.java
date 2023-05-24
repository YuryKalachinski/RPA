package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.UserRepo;
import com.kalachinski.rpa.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
