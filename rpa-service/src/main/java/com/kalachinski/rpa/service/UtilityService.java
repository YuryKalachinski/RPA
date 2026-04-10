package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.substation.Branch;
import com.kalachinski.rpa.model.substation.VoltageLevel;

import java.util.List;

public interface UtilityService {

    List<Branch> getAllBranches();

    List<VoltageLevel> getAllVoltageLevel();
}
