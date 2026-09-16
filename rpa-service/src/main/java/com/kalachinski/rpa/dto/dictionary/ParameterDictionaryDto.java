package com.kalachinski.rpa.dto.dictionary;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Parameter dictionary DTO layer")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ParameterDictionaryDto {

    @Schema(description = "Parameter identifier")
    private Long id;

    @Schema(description = "Key of the protection")
    @NotNull
    private String key;

    @Schema(description = "Unit of the protection")
    private String unit;

    @Schema(description = "Description of the protection")
    private String description;

    @Schema(description = "Priority of the protection")
    private Byte priority;
}

