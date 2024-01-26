package com.kalachinski.rpa.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ComplexDto {

    private Long id;
    private String name;
    private String description;
    private Set<ProtectionDto> protections;
}
