package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.model.substation.VoltageLevel;

import java.util.List;

public interface BayService {

    BayDto getById(Long id);

    BayDto addComplex(Long bayId, ComplexDto complexDto);

    List<VoltageLevel> getAllVoltageLevel();

    BayDto saveOrUpdateBay(BayDto bayDto);
}
