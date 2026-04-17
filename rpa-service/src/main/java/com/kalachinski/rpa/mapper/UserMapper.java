package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.user.UserDto;
import com.kalachinski.rpa.model.user.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    //todo unused method
//    List<UserDto> entityListToEntityDtoList(List<User> userList);

    UserDto userToDto(User user);
}

