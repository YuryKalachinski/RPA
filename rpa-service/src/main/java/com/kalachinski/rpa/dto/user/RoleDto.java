package com.kalachinski.rpa.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class RoleDto {

    //todo unused fields
    private Long id;
    private String title;
    private String code;
//    private Set<PermissionDto> permissions;
}
