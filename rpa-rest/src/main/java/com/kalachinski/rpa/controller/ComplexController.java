package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.service.ComplexService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Complex", description = "Endpoints for working with Complexes")
@RequestMapping("/complex")
@RequiredArgsConstructor
@RestController
public class ComplexController {

    private final ComplexService service;

    @PostMapping("/")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ComplexDto> addBay(
            @RequestBody ComplexDto complexDto
    ) {
        ComplexDto complexDto1 = service.saveOrUpdate(complexDto);
        return ResponseEntity.ok().body(complexDto1);
    }
}

