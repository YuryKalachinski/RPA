package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.dto.complex.ComplexDto;

public interface BayService {

    BayDto getById(Long id);

    BayDto addComplex(Long bayId, ComplexDto complexDto);
}
