package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.mapper.SubstationMapper;
import com.kalachinski.rpa.model.substation.Substation;
import com.kalachinski.rpa.repositories.SubstationRepo;
import com.kalachinski.rpa.service.SubstationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class SubstationServiceImpl implements SubstationService {

    private final SubstationRepo repo;
    private final SubstationMapper mapper;

    @Override
    @Transactional
    public List<SubstationDto> getAll() {
        return mapper.toDtoList(repo.getAll());
    }

    @Override
    @Transactional
    public SubstationDto getById(Long id) {

        //todo handle ResponseStatusException

        return mapper.toDtoWithBays(repo.getById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested id=%d", id))));
    }

    @Override
    @Transactional
    public SubstationDto saveOrUpdateSubstation(SubstationDto dto) {
        Substation current;
        var id = dto.getId();
        if (id != null) {
            current = repo.getById(id)
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                            String.format("Unable to find resource with requested id=%d", id)));
            mapper.updateEntityFromDto(dto, current);
        } else {
            current = mapper.toEntity(dto);
        }
        return mapper.toDtoWithoutBays(repo.save(current));
    }
}
