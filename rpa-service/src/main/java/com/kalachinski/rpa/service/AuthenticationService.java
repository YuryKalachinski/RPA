package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.user.AuthRequestDto;
import com.kalachinski.rpa.dto.user.RegisterRequestDto;
import com.kalachinski.rpa.dto.user.TokenDto;

public interface AuthenticationService {

    TokenDto register(RegisterRequestDto requestDto);

    TokenDto authenticate(AuthRequestDto requestDto);

    TokenDto refreshToken();
}
