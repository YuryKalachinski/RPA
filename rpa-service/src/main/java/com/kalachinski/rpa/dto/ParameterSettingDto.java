package com.kalachinski.rpa.dto;

import com.kalachinski.rpa.dto.protection.ProtectionSimpleDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParameterSettingDto {

    private Long id;
    private String key;
    private String value;
    private String unit;
    private String comment;
    private String description;
    private ProtectionSimpleDto protection;
}
