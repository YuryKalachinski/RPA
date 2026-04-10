package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.mapper.ComplexMapper;
import com.kalachinski.rpa.model.substation.Complex;
import com.kalachinski.rpa.repositories.ComplexRepo;
import com.kalachinski.rpa.service.ComplexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@Service
public class ComplexServiceImpl implements ComplexService {

    private final ComplexRepo repo;
    private final ComplexMapper mapper;

    @Override
    @Transactional
    public ComplexDto saveOrUpdate(ComplexDto dto) {
        Complex current;
        var id = dto.getId();
        if (id != null) {
            current = repo.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                            String.format("Unable to find resource with requested id=%d", id)));
            mapper.updateEntityFromDto(dto, current);
        } else {
            current = mapper.toEntity(dto);
        }
        return mapper.toDto(repo.save(current));
    }
}
