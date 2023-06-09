package com.kalachinski.rpa.dto;

import com.kalachinski.rpa.model.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private String firstName;
    private String lastName;
    private String email;
    private RoleDto role;
    private Status status;
}
