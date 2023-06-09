package com.kalachinski.rpa.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class RoleDto {

    private String title;
    private String code;
    private Set<PermissionDto> permissions;
}
