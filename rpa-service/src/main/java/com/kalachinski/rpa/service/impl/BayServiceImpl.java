package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.mapper.BayMapper;
import com.kalachinski.rpa.model.substation.Bay;
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
    public BayDto saveOrUpdateBay(BayDto dto) {
        Bay current;
        var id = dto.getId();
        if (id != null) {
            current = repo
                    .getById(id)
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                            String.format("Unable to find resource with requested id=%d", id)));
            mapper.updateEntityFromDto(dto, current);
            return mapper.toDtoWithoutComplexes(current);
        }
        current = mapper.toEntity(dto);
        return mapper.toDtoWithoutComplexes(repo.save(current));
    }
}
