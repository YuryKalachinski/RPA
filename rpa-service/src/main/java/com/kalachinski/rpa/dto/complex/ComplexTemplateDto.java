package com.kalachinski.rpa.dto.complex;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ComplexTemplateDto {

    private Long id;
    private String name;
    private String manufacturer;
    private ComplexDto complex;
}
