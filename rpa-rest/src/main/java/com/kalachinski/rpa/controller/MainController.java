package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.model.Substation;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.SubstationRepo;
import com.kalachinski.rpa.repositories.UserRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/main")
public class MainController {

    private final UserRepo userRepo;
    private final SubstationRepo substationRepo;

    public MainController(UserRepo userRepo,SubstationRepo substationRepo) {
        this.userRepo = userRepo;
        this.substationRepo = substationRepo;
    }

    @GetMapping("/user")
    public List<User> getUser() {
        return userRepo.findAll();
    }

    @GetMapping("/sub")
    public Set<Substation> getSubstation() {
        return substationRepo.findAll();
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
