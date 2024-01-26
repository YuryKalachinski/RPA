package com.kalachinski.rpa.security;

import com.kalachinski.rpa.model.Token;
import com.kalachinski.rpa.model.TokenType;
import com.kalachinski.rpa.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    @Value("${application.values.authorization-header}")
    private String AUTH_HEADER;

    private final TokenService tokenService;

    private final JwtProvider provider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader(AUTH_HEADER);
        if (authHeader == null || !(authHeader.startsWith("Bearer_") || authHeader.startsWith("Bearer "))) {
            filterChain.doFilter(request, response);
            return;
        }
        final String token = authHeader.substring(7);
        final String userEmail = provider.getUserEmailFromToken(token);
        Optional<Token> tokenFromDb = tokenService.findByToken(token);
        if (tokenFromDb.isPresent() && isTokenValid(tokenFromDb.get(), userEmail, request)) {
            UserDetails userDetails = new JwtUserDetails(tokenFromDb.get().getUser());
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }

    private boolean isTokenValid(Token token, String userEmail, HttpServletRequest request) {
        if (request.getRequestURI().equals("/auth/refresh-token")) {
            return provider.validateToken(token, userEmail, TokenType.REFRESH);
        }
        return provider.validateToken(token, userEmail, TokenType.ACCESS);
    }
}
