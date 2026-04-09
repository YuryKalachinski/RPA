package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.model.substation.Branch;

import java.util.List;

public interface SubstationService {

    List<SubstationDto> getAll();

    SubstationDto getById(Long id);

    SubstationDto saveOrUpdateSubstation(SubstationDto substationDto);

    List<Branch> getAllBranches();
}
