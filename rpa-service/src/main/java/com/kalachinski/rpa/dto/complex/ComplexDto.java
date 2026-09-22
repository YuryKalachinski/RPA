package com.kalachinski.rpa.dto.complex;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kalachinski.rpa.dto.bay.BaySimpleDto;
import com.kalachinski.rpa.dto.protection.ProtectionDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ComplexDto {

    private Long id;
    private String name;
    private String description;
    private String manufacturer;
    private BaySimpleDto bay;
    private Set<ProtectionDto> protections;
    private Boolean isDeleted;
}
