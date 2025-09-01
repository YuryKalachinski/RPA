package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Substation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
//public class SubstationServiceImpl implements SubstationService {
public class SubstationServiceImpl {

//    private final SubstationRepo substationRepo;
//    private final SubstationMapper substationMapper;
//
//    @Override
//    @Transactional
//    public List<SubstationDto> getAllSubstations() {
//        List<Substation> substations = substationRepo.findAll();
//        return substationMapper.listToDtoListWithoutBays(substations);
//    }
//
//    @Override
//    @Transactional
//    public SubstationDto getSubstationById(Long id) {
//
//        //todo handle ResponseStatusException
//
//        return substationMapper.substationByIdToDto(substationRepo.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
//                        String.format("Unable to find resource with requested id=%d", id))));
//    }
//
//    @Override
//    @Transactional
//    public SubstationDto getBayBySubstationIdAndBayId(Long substationId, Long bayId) {
//
//        //todo handle ResponseStatusException
//
//        return substationMapper.substationBySubstationIdAndBayIdToDto(substationRepo
//                .getBayBySubstationIdAndBayId(substationId, bayId)
//                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
//                        String.format("Unable to find resource with requested Substation id=%d and Bay id=%d",
//                                substationId, bayId))));
//    }
}
