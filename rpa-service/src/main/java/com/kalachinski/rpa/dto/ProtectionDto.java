package com.kalachinski.rpa.dto;

import com.kalachinski.rpa.model.ProtAction;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ProtectionDto {

    private Long id;
    private String name;
    private String description;
    private ProtAction protAction;
    private Set<TripDto> trips;
    private Set<ParameterSettingDto> parameterSettings;
}
