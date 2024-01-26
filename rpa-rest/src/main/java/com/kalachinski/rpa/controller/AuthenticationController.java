package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.AuthenticationRequestDto;
import com.kalachinski.rpa.dto.RegisterRequestDto;
import com.kalachinski.rpa.dto.TokenDto;
import com.kalachinski.rpa.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<TokenDto> register(
            @RequestBody RegisterRequestDto requestDto
    ) {
        log.info("Register new user with email: {}", requestDto.getEmail());
        return ResponseEntity.ok(authenticationService.register(requestDto));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authenticate(
            @RequestBody AuthenticationRequestDto requestDto
    ) {
        log.info("Authenticate user with email: {}", requestDto.getEmail());
        return ResponseEntity.ok(authenticationService.authenticate(requestDto));
    }

    @PostMapping("/refresh-token")
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<TokenDto> refreshToken() {
        log.info("Get new access and refresh token");
        return ResponseEntity.ok(authenticationService.refreshToken());
    }
}
