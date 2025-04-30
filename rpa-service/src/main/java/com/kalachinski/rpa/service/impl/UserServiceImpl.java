package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Status;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.UserRepo;
import com.kalachinski.rpa.service.RoleService;
import com.kalachinski.rpa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String USER_WITH_EMAIL_NOT_FOUND_MESSAGE = "Can't find User with email: ";

    private final UserRepo userRepo;
    private final RoleService roleService;
    private final BCryptPasswordEncoder passwordEncoder;
//    private final UserMapper userMapper;

    @Override
    public User register(User user) {
        user.setRole(roleService.findByDefaultCode())
                .setPassword(passwordEncoder.encode(user.getPassword()))
                .setStatus(Status.ACTIVE);

        return userRepo.save(user);
    }

    @Override
    public User findByEmail(String email) {
        //todo handle ResponseStatusException
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, USER_WITH_EMAIL_NOT_FOUND_MESSAGE + email));
    }

    @Override
    public List<User> findAllTelegramBotUser() {
        return userRepo.findAllTelegramBotUser();
    }

    @Override
    public Optional<User> findByTelegramBotUserId(Long id) {
        return userRepo.findByTelegramBotUserId(id);
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public void activate(String id, String email) {
        var decodingId = Long.valueOf(decode(id));
        var decodingEmail = decode(email);
        var userFromDb = userRepo.findById(decodingId);
        if (userFromDb.isPresent()
                && Objects.equals(userFromDb.get().getStatus(), Status.NOT_ACTIVE)
                && userFromDb.get().getEmail() == null
        ) {
            var user = userFromDb.get()
                    .setStatus(Status.ACTIVE)
                    .setEmail(decodingEmail);

            userRepo.save(user);
        }
    }

    private String decode(String string) {
        return new String(Base64.decodeBase64(string.getBytes()));
    }
}
