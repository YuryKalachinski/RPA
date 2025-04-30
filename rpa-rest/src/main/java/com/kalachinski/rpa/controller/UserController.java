package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

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
        return ResponseEntity.ok().body("Success activation.");
    }
}
