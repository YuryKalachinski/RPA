package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.SubstationDto;

import java.util.List;

public interface SubstationService {

    List<SubstationDto> getAllSubstations();

    SubstationDto getSubstationById(Long id);

    SubstationDto getBayBySubstationIdAndBayId(Long substationId, Long bayId);
}
