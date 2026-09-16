package com.kalachinski.rpa.dto.substation;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Substation DTO layer")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class SubstationSimpleDto {

    @Schema(description = "Substation identifier")
    private Long id;

    @Schema(description = "Name of the substation")
    @NotNull
    private String name;
}
