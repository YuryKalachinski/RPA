package com.kalachinski.rpa.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@NoArgsConstructor
@Getter
@Setter
public class RegisterRequestDto {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
