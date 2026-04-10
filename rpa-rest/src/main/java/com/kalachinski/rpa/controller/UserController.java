package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.UserDto;
import com.kalachinski.rpa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    //todo make swagger annotations
    //todo make logging

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    //todo unused method
//    @GetMapping(produces = APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('ADMIN')")
//    public ResponseEntity<List<UserDto>> getAllUsers() {
//        return ResponseEntity.ok()
//                .body(userService.findAll());
//    }

    @GetMapping("/activation")
    public ResponseEntity<?> activation(@RequestParam("id") String id, @RequestParam("email") String email) {
        userService.activate(id, email);
        //todo нужно ли возвращать Response
        log.info("User with email {} is activated successfully ", email);
        return ResponseEntity.ok().body("Success activation.");
    }

    @GetMapping("/authenticated")
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<UserDto> getCurrentUser() {
        var user = userService.getCurrentUser();
        log.info("User {} is authenticated successfully ", user.getEmail());
        return ResponseEntity.ok(user);
    }
}
