package com.kalachinski.rpa.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TripDto {

    private Long id;
    private LocalDateTime tripTime;
    private LocalDateTime closeTime;
    private Float distance;
}
