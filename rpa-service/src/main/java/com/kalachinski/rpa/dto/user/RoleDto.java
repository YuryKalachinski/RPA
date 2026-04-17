package com.kalachinski.rpa.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoleDto {

    //todo unused fields
    private Long id;
    private String title;
    private String code;
//    private Set<PermissionDto> permissions;
}
