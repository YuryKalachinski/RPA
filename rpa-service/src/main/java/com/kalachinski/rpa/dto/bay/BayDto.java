package com.kalachinski.rpa.dto.bay;

import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.dto.substation.SubstationSimpleDto;
import com.kalachinski.rpa.model.substation.VoltageLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class BayDto {

    private Long id;
    private String name;
    private String description;
    private String cellNumber;
    private SubstationSimpleDto substation;
    private VoltageLevel voltageLevel;
//    private Set<TripDto> trips;
    private Set<ComplexDto> complexes;
    private Boolean isDeleted;
}
