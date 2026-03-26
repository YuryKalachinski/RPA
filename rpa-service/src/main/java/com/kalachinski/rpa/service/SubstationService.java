package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.SubstationDto;
import com.kalachinski.rpa.model.Branch;

import java.util.List;

public interface SubstationService {

    List<SubstationDto> getAllSubstations();

    SubstationDto getSubstationById(Long id);

    SubstationDto getBayBySubstationIdAndBayId(Long substationId, Long bayId);

    SubstationDto addNewSubstation(SubstationDto substationDto);

    List<Branch> getAllBranches();
}
