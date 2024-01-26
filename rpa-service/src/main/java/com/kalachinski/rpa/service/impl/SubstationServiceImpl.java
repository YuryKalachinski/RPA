package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.SubstationDto;
import com.kalachinski.rpa.mapper.SubstationMapper;
import com.kalachinski.rpa.model.Substation;
import com.kalachinski.rpa.repositories.SubstationRepo;
import com.kalachinski.rpa.service.SubstationService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class SubstationServiceImpl implements SubstationService {

    private final SubstationRepo substationRepo;
    private final SubstationMapper substationMapper;

    @Override
    @Transactional
    public List<SubstationDto> getAllSubstations() {
        List<Substation> substations = substationRepo.findAll();
        return substationMapper.listToDtoListWithoutBays(substations);
    }

    @Override
    @Transactional
    public SubstationDto getSubstationById(Long id) {

        //todo handle ResponseStatusException

        return substationMapper.substationByIdToDto(substationRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested id=%d", id))));
    }

    @Override
    @Transactional
    public SubstationDto getBayBySubstationIdAndBayId(Long substationId, Long bayId) {

        //todo handle ResponseStatusException

        return substationMapper.substationBySubstationIdAndBayIdToDto(substationRepo
                .getBayBySubstationIdAndBayId(substationId, bayId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested Substation id=%d and Bay id=%d",
                                substationId, bayId))));
    }
}
