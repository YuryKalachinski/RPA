package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.model.substation.Branch;
import com.kalachinski.rpa.service.SubstationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/substation")
@Tag(name = "Substation", description = "Methods for working with Substations")
public class SubstationController {

    //todo make swagger annotations
    //todo make logging

    private static final Logger log = LoggerFactory.getLogger(SubstationController.class);

    private final SubstationService substationService;

    public SubstationController(SubstationService substationService) {
        this.substationService = substationService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all available substations",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = SubstationDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Substations not found", responseCode = "404", content = @Content)
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<SubstationDto>> getAllSubstations() {
        return ResponseEntity.ok().body(substationService.getAll());
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value = "/{id}")
    @Operation(summary = "Get substation by id.",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = SubstationDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Substations not found", responseCode = "404", content = @Content)
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<SubstationDto> getSubstationById(
            @Parameter(description = "Substation id", example = "1")
            @PathVariable("id") Long id) {
        return ResponseEntity.ok().body(substationService.getById(id));
    }

    @PostMapping("/")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SubstationDto> saveSubstation(
            @RequestBody SubstationDto substationDto
    ) {
        return ResponseEntity.ok().body(substationService.saveOrUpdateSubstation(substationDto));
    }

    @PatchMapping("/")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SubstationDto> updateSubstation(
            @RequestBody SubstationDto substationDto
    ) {
        return ResponseEntity.ok().body(substationService.saveOrUpdateSubstation(substationDto));
    }

    @GetMapping("/branch")
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<Branch>> getAllBranch() {
        return ResponseEntity.ok().body(substationService.getAllBranches());
    }
}
