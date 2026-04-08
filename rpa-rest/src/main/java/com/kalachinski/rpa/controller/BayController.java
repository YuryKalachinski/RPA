package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.service.BayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/bay")
@Tag(name = "Substation", description = "Methods for working with Substations")
public class BayController {

    //todo make swagger annotations
    //todo make logging

    private final BayService bayService;

    public BayController(BayService bayService) {
        this.bayService = bayService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value = "/{id}")
    @Operation(summary = "Get information about bay by id.",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = SubstationDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Substations not found", responseCode = "404", content = @Content)
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<BayDto> getBayById(
            @Parameter(description = "Bay id", example = "1")
            @PathVariable("id") Long id) {
        return ResponseEntity.ok().body(bayService.getById(id));
    }

    @PostMapping("/{bayId}/complex/")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<BayDto> addBay(
            @Parameter(description = "Bay id", example = "1")
            @PathVariable("bayId") Long bayId,
            @RequestBody ComplexDto complexDto
    ) {
        return ResponseEntity.ok().body(bayService.addComplex(bayId, complexDto));
    }
}
