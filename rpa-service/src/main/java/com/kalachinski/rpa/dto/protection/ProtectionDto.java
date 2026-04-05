package com.kalachinski.rpa.dto.protection;

import com.kalachinski.rpa.dto.ParameterSettingDto;
import com.kalachinski.rpa.dto.complex.ComplexSimpleDto;
import com.kalachinski.rpa.model.substation.ProtAction;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ProtectionDto {

    private Long id;
    private boolean isRoot;
    private String name;
    private String description;
    private ProtAction protAction;
    private ProtectionSimpleDto parent;
    private ComplexSimpleDto complex;
    //    private Set<TripDto> trips;
    private Set<ProtectionDto> children;
    private Set<ParameterSettingDto> parameterSettings;
}
