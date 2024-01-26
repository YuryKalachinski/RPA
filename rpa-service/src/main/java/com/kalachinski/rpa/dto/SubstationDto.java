package com.kalachinski.rpa.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Schema(description = "Substation DTO layer")
public class SubstationDto {

    @Schema(description = "Substation identifier")
    private Long id;

    @Schema(description = "Name of the substation")
    @NotNull
    private String name;

    @Schema(description = "Description of the substation")
    private String description;

    @Schema(description = "Branch of the substation")
    private String branch;

    @Schema(description = "Bays of the substation")
    private Set<BayDto> bays;
}
