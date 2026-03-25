package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.AuthenticationRequestDto;
import com.kalachinski.rpa.dto.RegisterRequestDto;
import com.kalachinski.rpa.dto.TokenDto;
import com.kalachinski.rpa.dto.UserDto;

public interface AuthenticationService {

    TokenDto register(RegisterRequestDto requestDto);

    TokenDto authenticate(AuthenticationRequestDto requestDto);

    TokenDto refreshToken();


}
