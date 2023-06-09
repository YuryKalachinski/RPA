package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.AuthenticationRequestDto;
import com.kalachinski.rpa.dto.RegisterRequestDto;
import com.kalachinski.rpa.dto.TokenResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {

    TokenResponseDto register(RegisterRequestDto requestDto);

    TokenResponseDto authenticate(AuthenticationRequestDto requestDto);

    TokenResponseDto refreshToken();
}
