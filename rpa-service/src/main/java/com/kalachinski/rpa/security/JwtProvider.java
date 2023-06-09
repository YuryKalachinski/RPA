package com.kalachinski.rpa.security;

import com.kalachinski.rpa.model.Token;
import com.kalachinski.rpa.model.TokenType;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${security.jwt.token.secret-key}")
    private String secret;

    @Value("${security.jwt.token.expiration-in-minutes}")
    private Long jwtExpiration;

    @Value("${security.jwt.token.refresh-token.expiration-in-minutes}")
    private Long refreshJwtExpiration;

    private final TokenService tokenService;

    @PostConstruct
    protected void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String generateToken(User user) {
        log.info("Generate access token for user: {}", user.getEmail());
        Map<String, Object> extraClaims = getExtraClaims(user);
        return buildToken(extraClaims, user.getEmail(), jwtExpiration);
    }

    public String generateRefreshToken(User user) {
        log.info("Generate refresh token for user: {}", user.getEmail());
        Map<String, Object> extraClaims = getExtraClaims(user);
        return buildToken(extraClaims, user.getEmail(), refreshJwtExpiration);
    }

    public String getUserEmailFromToken(String token) {
        log.info("Get email from token and check expire time");
        try {
            //todo handle AnotherExceptions
            return extractClaim(token, Claims::getSubject);
        } catch (ExpiredJwtException e) {
            tokenService.setTokenExpired(token);
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage());
        }
    }

    public boolean validateToken(Token token, String userEmail, TokenType tokenType) {
        return token.getUser().getEmail().equals(userEmail)
                && !token.isRevoked()
                && token.getTokenType().equals(tokenType);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private String buildToken(Map<String, Object> extraClaims, String userName, long expiration) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000 * 60))
                .signWith(getSignInKey())
                .compact();
    }

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    private Map<String, Object> getExtraClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("First Name", user.getFirstName());
        claims.put("Last Name", user.getLastName());
        claims.put("Email", user.getEmail());
        return claims;
    }
}
