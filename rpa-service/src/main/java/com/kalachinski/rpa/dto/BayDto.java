package com.kalachinski.rpa.dto;

import com.kalachinski.rpa.model.VoltageLevel;
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
    private Byte cellNumber;
    private VoltageLevel voltageLevel;
    private Set<TripDto> trips;
    private Set<ComplexDto> complexes;
}
