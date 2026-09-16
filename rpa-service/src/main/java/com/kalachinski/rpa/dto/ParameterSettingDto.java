package com.kalachinski.rpa.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kalachinski.rpa.dto.protection.ProtectionSimpleDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ParameterSettingDto {

    private Long id;
    private String key;
    private String value;
    private String unit;
    private String comment;
    private String description;
    private ProtectionSimpleDto protection;
    private Boolean isDeleted;
}
