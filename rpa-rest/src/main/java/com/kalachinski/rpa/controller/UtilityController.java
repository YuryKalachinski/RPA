package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.model.substation.Branch;
import com.kalachinski.rpa.model.substation.VoltageLevel;
import com.kalachinski.rpa.service.UtilityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/utility")
@Tag(name = "Utility", description = "Utility methods.")
@RequiredArgsConstructor
public class UtilityController {

    UtilityService service;

    @GetMapping("/branch")
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<Branch>> getAllBranch() {
        return ResponseEntity.ok().body(service.getAllBranches());
    }

    @GetMapping("/voltage_level")
    @PreAuthorize("hasAuthority('VIEWER')")
    public ResponseEntity<List<VoltageLevel>> getAllVoltageLevel() {
        return ResponseEntity.ok().body(service.getAllVoltageLevel());
    }

}
