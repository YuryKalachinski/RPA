package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.AuthenticationRequestDto;
import com.kalachinski.rpa.dto.RegisterRequestDto;
import com.kalachinski.rpa.dto.TokenDto;
import com.kalachinski.rpa.model.Token;
import com.kalachinski.rpa.model.TokenType;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.security.JwtProvider;
import com.kalachinski.rpa.security.JwtUserDetails;
import com.kalachinski.rpa.service.AuthenticationService;
import com.kalachinski.rpa.service.TokenService;
import com.kalachinski.rpa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Value("${application.values.authorization-header}")
    private String AUTH_HEADER;

    private final UserService userService;
    private final TokenService tokenService;
    private final JwtProvider provider;
    private final AuthenticationManager authenticationManager;

    @Override
    public TokenDto register(RegisterRequestDto requestDto) {
        log.info("Register new user.");
        User user = new User()
                .setFirstName(requestDto.getFirstname())
                .setLastName(requestDto.getLastname())
//                .setPassword(requestDto.getPassword())
                .setEmail(requestDto.getEmail());
        User savedUser = userService.register(user);
        log.info("User: {} has been registered successfully", user.getEmail());
        String jwtToken = provider.generateAccessToken(savedUser);
        String refreshJwtToken = provider.generateRefreshToken(savedUser);
        log.info("Save access and refresh tokens for user {} to database", savedUser.getEmail());
        saveTokensToDb(savedUser, jwtToken, refreshJwtToken);
        return new TokenDto()
                .setAccessToken(jwtToken)
                .setRefreshToken(refreshJwtToken);
    }

    @Override
    public TokenDto authenticate(AuthenticationRequestDto requestDto) {
        log.info("Try to authenticate user with email: {}", requestDto.getEmail());

        //todo handle AuthenticationException
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDto.getEmail(),
                        requestDto.getPassword()
                )
        );
        User user = ((JwtUserDetails) authenticate.getPrincipal()).getUser();
        log.info("User has been authenticated successfully");
        String jwtToken = provider.generateAccessToken(user);
        String refreshJwtToken = provider.generateRefreshToken(user);
        log.info("Revoke all valid tokens for user {}", user.getEmail());
        revokeAllValidTokensForUser(user);
        log.info("Save access and refresh tokens for user {} to database", user.getEmail());
        saveTokensToDb(user, jwtToken, refreshJwtToken);
        return new TokenDto()
                .setAccessToken(jwtToken)
                .setRefreshToken(refreshJwtToken);
    }

    @Override
    public TokenDto refreshToken() {
        User user = getUserFromContext();
        String newAccessToken = provider.generateAccessToken(user);
        String newRefreshToken = provider.generateRefreshToken(user);
        log.info("Revoke all valid tokens for user {}", user.getEmail());
        revokeAllValidTokensForUser(user);
        log.info("Save access and refresh tokens for user {} to database", user.getEmail());
        saveTokensToDb(user, newAccessToken, newRefreshToken);
        return new TokenDto(newAccessToken, newRefreshToken);
    }

    private static User getUserFromContext() {
        return ((JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    private void revokeAllValidTokensForUser(User user) {
        List<Token> validTokens = tokenService.findAllValidTokensByUser(user.getId());
        validTokens.forEach(token -> token.setRevoked(true));
        tokenService.saveAll(validTokens);
    }

    private void saveTokensToDb(User savedUser, String jwtToken, String refreshJwtToken) {
        List<Token> tokenList = new ArrayList<>();
        tokenList.add(createToken(savedUser, jwtToken, TokenType.ACCESS));
        tokenList.add(createToken(savedUser, refreshJwtToken, TokenType.REFRESH));
        tokenService.saveAll(tokenList);
    }

    private Token createToken(User savedUser, String jwtToken, TokenType tokenType) {
        return new Token()
                .setToken(jwtToken)
                .setTokenType(tokenType)
                .setUser(savedUser)
                .setExpired(false)
                .setRevoked(false);
    }
}
