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

@Service
@RequiredArgsConstructor
public class BayServiceImpl implements BayService {

    private final BayRepo bayRepo;
    private final BayMapper bayMapper;

    @Override
    @Transactional
    public BayDto getById(Long id) {

        //todo handle ResponseStatusException

        Bay bay = bayRepo
                .getByIdWithChildren(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested Bay id=%d", id)));

        return bayMapper.toDtoWithComplexes(bay);
    }
}
