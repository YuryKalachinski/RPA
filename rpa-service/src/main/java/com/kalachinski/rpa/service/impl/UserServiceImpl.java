package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Status;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.UserRepo;
import com.kalachinski.rpa.service.RoleService;
import com.kalachinski.rpa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String USER_WITH_EMAIL_NOT_FOUND_MESSAGE = "Can't find User with email: ";

    private final UserRepo userRepo;

    private final RoleService roleService;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public User register(User user) {
        user.setRole(roleService.findByDefaultCode())
                .setPassword(passwordEncoder.encode(user.getPassword()))
                .setStatus(Status.ACTIVE);

        return userRepo.save(user);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User findByEmail(String email) {
        //todo handle ResponseStatusException
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, USER_WITH_EMAIL_NOT_FOUND_MESSAGE + email));
    }
}
