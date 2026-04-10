package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.mapper.BayMapper;
import com.kalachinski.rpa.model.substation.Bay;
import com.kalachinski.rpa.model.substation.Complex;
import com.kalachinski.rpa.repositories.BayRepo;
import com.kalachinski.rpa.service.BayService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@Service
public class BayServiceImpl implements BayService {

    private final BayRepo repo;
    private final BayMapper mapper;

    @Override
    @Transactional
    public BayDto getById(Long id) {

        //todo handle ResponseStatusException

        Bay bay = repo
                .getByIdWithChildren(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested Bay id=%d", id)));

        return mapper.toDtoWithComplexes(bay);
    }

    @Override
    @Transactional
    public BayDto addComplex(Long id, ComplexDto complexDto) {
        Bay current = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested id=%d", id)));
        current.getComplexes().add(new Complex()
                .setName(complexDto.getName())
                .setDescription(complexDto.getDescription())
                .setBay(current)
        );
        return mapper.toDtoWithComplexes(current);
    }

    @Override
    public BayDto saveOrUpdateBay(BayDto dto) {
        Bay current;
        var id = dto.getId();
        if (id != null) {
            current = repo.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                            String.format("Unable to find resource with requested id=%d", id)));
            mapper.updateEntityFromDto(dto, current);
        } else {
            current = mapper.toEntity(dto);
        }
        return mapper.toDtoWithComplexes(repo.save(current));
    }
}
