package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.SubstationDto;
import com.kalachinski.rpa.service.SubstationService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/substation")
@Tag(name = "Substation", description = "Methods for working with Substations")
public class SubstationController {

    //todo make swagger annotations

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
        return ResponseEntity.ok().body(substationService.getAllSubstations());
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
        return ResponseEntity.ok().body(substationService.getSubstationById(id));
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value = "/{substationId}/bay/{bayId}")
    @Operation(summary = "Get information about bay by substation and bay id.",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = SubstationDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Substations not found", responseCode = "404", content = @Content)
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<SubstationDto> getBayBySubstationIdAndBayId(
            @Parameter(description = "Substation id", example = "1")
            @PathVariable("substationId") Long substationId,
            @Parameter(description = "Bay id", example = "1")
            @PathVariable("bayId") Long bayId) {
        return ResponseEntity.ok().body(substationService.getBayBySubstationIdAndBayId(substationId, bayId));
    }
}
