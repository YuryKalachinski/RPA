package com.kalachinski.rpa.dto.dictionary;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Schema(description = "Protection dictionary DTO layer")
public class ProtectionDictionaryDto {

    @Schema(description = "Protection identifier")
    private Long id;

    @Schema(description = "Name of the protection")
    @NotNull
    private String name;

    @Schema(description = "Description of the protection")
    @NotNull
    private String description;

    @Schema(description = "Priority of the protection")
    @NotNull
    private Byte priority;
}
