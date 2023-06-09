package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.repositories.SubstationRepo;
import com.kalachinski.rpa.service.SubstationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SubstationServiceImpl implements SubstationService {

    private final SubstationRepo substationRepo;

}
