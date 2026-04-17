package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.bay.BayDto;

public interface BayService {

    BayDto getById(Long id);

    BayDto saveOrUpdateBay(BayDto bayDto);
}
