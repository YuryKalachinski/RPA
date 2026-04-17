package com.kalachinski.rpa.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RegisterRequestDto {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
