package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.Token;
import com.kalachinski.rpa.model.User;

import java.util.List;
import java.util.Optional;

public interface TokenService {

    Token save(Token token);

    List<Token> saveAll(List<Token> tokens);

    Optional<Token> findByToken(String token);

    List<Token> findAllValidTokensByUser(Long userId);

    void setTokenRevoked(String token);

    void setTokenExpired(String token);

    void revokeAllValidTokensForUser(User user);
}
