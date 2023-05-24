package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @Hidden
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok()
                .body(userService.getAllUsers());
    }
}
