package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Token;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.repositories.TokenRepo;
import com.kalachinski.rpa.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private static final Logger log = LoggerFactory.getLogger(TokenServiceImpl.class);

    private final TokenRepo tokenRepo;

    @Override
    public Token save(Token token) {
        log.info("Save token to database");
        return tokenRepo.save(token);
    }

    @Override
    public List<Token> saveAll(List<Token> tokens) {
        log.info("Save list of tokens to database");
        return (List<Token>) tokenRepo.saveAll(tokens);
    }

    @Override
    public Optional<Token> findByToken(String token) {
        log.info("Find token into database");
        return tokenRepo.findByToken(token);
    }

    @Override
    public List<Token> findAllValidTokensByUser(Long userId) {
        log.info("Find all valid tokens for user with id: {}", userId);
        return tokenRepo.findAllValidTokensByUser(userId);
    }

    @Override
    public void setTokenRevoked(String token) {
        log.info("Set token revoked");
        tokenRepo.findByToken(token).ifPresent(value -> value.setRevoked(true));
    }

    @Override
    public void setTokenExpired(String token) {
        log.info("Set token expired");
        tokenRepo.findByToken(token).ifPresent(value -> value.setExpired(true));
    }

    @Override
    public void revokeAllValidTokensForUser(User user) {
        log.info("Revoke all valid tokens for user {}", user.getEmail());
        List<Token> validTokens = tokenRepo.findAllValidTokensByUser(user.getId());
        validTokens.forEach(token -> token.setRevoked(true));
    }
}
