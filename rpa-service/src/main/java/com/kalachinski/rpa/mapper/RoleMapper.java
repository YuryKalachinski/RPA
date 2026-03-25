package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.RoleDto;
import com.kalachinski.rpa.model.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    //todo unused method
    RoleDto entityToDto(Role role);

}
