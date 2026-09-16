package com.kalachinski.rpa.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kalachinski.rpa.model.user.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class UserDto {

    //todo unused fields
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDateTime firstLoginDate;
    private String userName;
    private Long telegramUserId;
    private RoleDto role;
    private Status status;
    private Boolean isTelegramUser;
    private Boolean isWebUser;
}
