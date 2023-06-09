package com.kalachinski.rpa.security;

import com.kalachinski.rpa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(JwtUserDetailsService.class);

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Load user by email {} to UserDetailsService", email);
        return new JwtUserDetails(userService.findByEmail(email));
    }
}
