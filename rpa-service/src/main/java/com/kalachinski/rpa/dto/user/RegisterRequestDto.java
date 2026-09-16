package com.kalachinski.rpa.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class RegisterRequestDto {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
