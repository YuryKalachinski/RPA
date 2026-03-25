package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.UserDto;
import com.kalachinski.rpa.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        uses = {RoleMapper.class}
)
public interface UserMapper {

    //todo unused method
//    List<UserDto> entityListToEntityDtoList(List<User> userList);

    UserDto userToDto(User user);
}

