package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.SubstationDto;
import com.kalachinski.rpa.service.SubstationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/sub")
@Tag(name = "Substation", description = "Methods for working with Substations")
public class SubstationController {

    private final SubstationService substationService;

    public SubstationController(SubstationService substationService) {
        this.substationService = substationService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all available substations",
            responses = {
                    @ApiResponse(description = "Success",
                            responseCode = "200"),
                    @ApiResponse(description = "Unauthorized/Invalid token",
                            responseCode = "403")
            })
    public ResponseEntity<List<SubstationDto>> getAllSubstation() {
        return ResponseEntity.of(Optional.of(Collections.emptyList()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get substation by id")
    public ResponseEntity<SubstationDto> getSubstation(
            @Parameter(description = "Substation id")
            @PathVariable("id") Long id) {
        return ResponseEntity.of(Optional.empty());
    }
}
