package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.exception.LogoutException;
import com.kalachinski.rpa.model.Token;
import com.kalachinski.rpa.model.TokenType;
import com.kalachinski.rpa.security.JwtProvider;
import com.kalachinski.rpa.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    @Value("${application.values.authorization-header}")
    private String AUTH_HEADER;

    private final TokenService tokenService;

    private final JwtProvider provider;

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        final String authHeader = request.getHeader(AUTH_HEADER);
        if (authHeader == null || !(authHeader.startsWith("Bearer_") || authHeader.startsWith("Bearer "))) {
            throw new LogoutException("User doesn't authentication.");
        }
        final String token = authHeader.substring(7);
        final String userEmail = provider.getUserEmailFromToken(token);
        Optional<Token> tokenFromDb = tokenService.findByToken(token);
        if (tokenFromDb.isEmpty() || isTokenInvalid(tokenFromDb.get(), userEmail)) {
            throw new LogoutException("User doesn't authentication.");
        }
        tokenService.revokeAllValidTokensForUser(tokenFromDb.get().getUser());
    }

    private boolean isTokenInvalid(Token token, String userEmail) {
        return !provider.validateToken(token, userEmail, TokenType.ACCESS);
    }
}
