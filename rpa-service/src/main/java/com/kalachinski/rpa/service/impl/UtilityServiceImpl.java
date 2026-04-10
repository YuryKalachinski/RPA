package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.substation.Branch;
import com.kalachinski.rpa.model.substation.VoltageLevel;
import com.kalachinski.rpa.service.UtilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilityServiceImpl implements UtilityService {

    @Override
    public List<Branch> getAllBranches() {
        return List.of(Branch.values());
    }

    @Override
    public List<VoltageLevel> getAllVoltageLevel() {
        return List.of(VoltageLevel.values());
    }
}
