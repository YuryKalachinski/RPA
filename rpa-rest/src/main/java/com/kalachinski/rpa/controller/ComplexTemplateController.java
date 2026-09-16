package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.complex.ComplexTemplateDto;
import com.kalachinski.rpa.service.ComplexTemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = "Complex Template", description = "Endpoints for working with Complex Templates")
@RequestMapping("/complex_template")
@RequiredArgsConstructor
@RestController
public class ComplexTemplateController {

    private final ComplexTemplateService service;

    @GetMapping(produces = APPLICATION_JSON_VALUE, value = "/")
    @Operation(summary = "Get all available templates",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = ComplexTemplateDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
                    @ApiResponse(description = "Substations not found", responseCode = "404", content = @Content)
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<ComplexTemplateDto>> getAllComplexTemplates() {
        return ResponseEntity.ok().body(service.getAll());
    }
}
