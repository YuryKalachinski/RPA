package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.BayDto;
import com.kalachinski.rpa.dto.SubstationDto;
import com.kalachinski.rpa.mapper.SubstationMapper;
import com.kalachinski.rpa.model.Bay;
import com.kalachinski.rpa.model.Branch;
import com.kalachinski.rpa.model.Substation;
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
    public SubstationDto getBayBySubstationIdAndBayId(Long subId, Long bayId) {

        //todo handle ResponseStatusException

        return substationMapper.substationBySubstationIdAndBayIdToDto(substationRepo
                .getBayBySubstationIdAndBayId(subId, bayId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested Substation id=%d and Bay id=%d",
                                subId, bayId))));
    }

    @Override
    @Transactional
    public SubstationDto addNewSubstation(SubstationDto substationDto) {
        return substationMapper.toDtoWithoutBays(substationRepo.save(new Substation()
                .setName(substationDto.getName())
//                .setBranch(Branch.fromField(substationDto.getBranch()))
                .setBranch(substationDto.getBranch()))
                .setDescription(substationDto.getDescription()));
    }

    @Override
    public List<Branch> getAllBranches() {
        return List.of(Branch.values());
    }

    @Override
    @Transactional
    public SubstationDto addNewBay(Long id, BayDto bayDto) {
        Substation current = substationRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                        String.format("Unable to find resource with requested id=%d", id)));
        current.getBays().add(new Bay()
                .setName(bayDto.getName())
                .setDescription(bayDto.getDescription())
                .setCellNumber(bayDto.getCellNumber())
                .setSubstation(current)
                .setVoltageLevel(bayDto.getVoltageLevel())
        );

        return substationMapper.substationByIdToDto(substationRepo.save(current));
    }
}
