package com.kalachinski.rpa.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class TripDto {

    private Long id;
    private LocalDateTime tripTime;
    private LocalDateTime closeTime;
    private Float distance;
}
