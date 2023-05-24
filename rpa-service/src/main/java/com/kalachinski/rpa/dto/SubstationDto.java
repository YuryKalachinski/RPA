package com.kalachinski.rpa.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Schema(description = "Substation DTO layer")
public class SubstationDto {

    @Schema(description = "Substation identifier")
    private Long id;

    @Schema(description = "Name of substation")
    @NotNull
    private String name;

    @Schema(description = "Description of substation")
    private String description;
}
