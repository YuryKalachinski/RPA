package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.complex.ComplexTemplateDto;
import com.kalachinski.rpa.mapper.ComplexTemplateMapper;
import com.kalachinski.rpa.model.dictionary.ComplexTemplate;
import com.kalachinski.rpa.repositories.ComplexTemplateRepo;
import com.kalachinski.rpa.service.ComplexTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@Service
public class ComplexTemplateServiceImpl implements ComplexTemplateService {

    private final ComplexTemplateRepo repo;
    private final ComplexTemplateMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<ComplexTemplateDto> getAll() {
        return mapper.toDtoList(repo.getAll());
    }

    @Override
    @Transactional
    public ComplexTemplateDto saveOrUpdate(ComplexTemplateDto dto) {
        ComplexTemplate template;
        var id = dto.getId();
        if (id != null) {
            template = repo.getByIdWithChildren(id)
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                            String.format("Unable to find resource with requested id=%d", id)));
            template = mapper.toEntity(dto, template);
        } else {
            template = mapper.toEntity(dto, new ComplexTemplate());
        }
        return mapper.toDto(repo.save(template));
    }
}
