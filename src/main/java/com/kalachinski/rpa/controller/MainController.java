package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.UserRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/main")
public class MainController {

    private final UserRepo userRepo;

    public MainController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> getMain() {
        return userRepo.findAll();
    }

    @GetMapping("/add")
    public List<User> addUser() {
        Random random = new Random();
        User user = new User();
        user.setEmail("bla" +  random.nextInt() + "@bla.com");
        user.setPassword("*****");
        userRepo.save(user);
        return userRepo.findAll();
    }
}
