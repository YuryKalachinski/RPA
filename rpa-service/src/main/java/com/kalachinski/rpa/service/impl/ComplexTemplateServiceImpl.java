package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.complex.ComplexTemplateDto;
import com.kalachinski.rpa.mapper.ComplexTemplateMapper;
import com.kalachinski.rpa.repositories.ComplexTemplateRepo;
import com.kalachinski.rpa.service.ComplexTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ComplexTemplateServiceImpl implements ComplexTemplateService {

    private final ComplexTemplateRepo repo;
    private final ComplexTemplateMapper mapper;

    @Transactional(readOnly = true)
    @Override
    public List<ComplexTemplateDto> getAll() {
        return mapper.toDtoList(repo.getAll());
    }
}
