package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.user.UserDto;
import com.kalachinski.rpa.model.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {

    //todo unused method
//    List<UserDto> entityListToEntityDtoList(List<User> userList);

    //    MAPPING to DTO

    @Mappings({
            @Mapping(target = "isTelegramUser", source = "telegramUser"),
            @Mapping(target = "isWebUser", source = "webUser")
    })
    UserDto toDto(User user);
}

