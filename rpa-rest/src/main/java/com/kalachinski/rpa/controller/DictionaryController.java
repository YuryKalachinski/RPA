package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.dto.dictionary.ParameterDictionaryDto;
import com.kalachinski.rpa.dto.dictionary.ProtectionDictionaryDto;
import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.model.dictionary.ProtectionDictionary;
import com.kalachinski.rpa.service.DictionaryService;
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

@Tag(name = "Dictionary", description = "Dictionary methods.")
@RequestMapping("/dictionary")
@RequiredArgsConstructor
@RestController
public class DictionaryController {

    private final DictionaryService service;

    @GetMapping(produces = APPLICATION_JSON_VALUE, value = "/protection")
    @Operation(summary = "Get all protections from dictionary",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = ProtectionDictionaryDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<ProtectionDictionaryDto>> getAllProtections() {
        return ResponseEntity.ok().body(service.getAllProtections());
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value = "/parameter")
    @Operation(summary = "Get all parameters from dictionary",
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = ParameterDictionaryDto.class),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(description = "Unauthorized/Invalid token", responseCode = "403", content = @Content),
            })
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<ParameterDictionaryDto>> getAllParameters() {
        return ResponseEntity.ok().body(service.getAllParameters());
    }
}
