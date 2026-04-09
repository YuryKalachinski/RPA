package com.kalachinski.rpa.dto.substation;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Schema(description = "Substation DTO layer")
public class SubstationSimpleDto {

    @Schema(description = "Substation identifier")
    private Long id;

    @Schema(description = "Name of the substation")
    @NotNull
    private String name;
}
