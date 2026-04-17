package com.kalachinski.rpa.dto.complex;

import com.kalachinski.rpa.dto.bay.BaySimpleDto;
import com.kalachinski.rpa.dto.protection.ProtectionDto;
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
    private BaySimpleDto bay;
    private Set<ProtectionDto> protections;
    private Boolean isDeleted;
}
