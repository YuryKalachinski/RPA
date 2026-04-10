package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.substation.SubstationDto;

import java.util.List;

public interface SubstationService {

    List<SubstationDto> getAll();

    SubstationDto getById(Long id);

    SubstationDto saveOrUpdateSubstation(SubstationDto substationDto);
}
