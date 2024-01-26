package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.SubstationDto;
import com.kalachinski.rpa.model.Substation;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {BayMapper.class}
)
public interface SubstationMapper {

    @IterableMapping(qualifiedByName = "withoutBays")
    List<SubstationDto> listToDtoListWithoutBays(List<Substation> substations);

    @Named("withoutBays")
    @Mapping(target = "bays", ignore = true)
    SubstationDto toDtoWithoutBays(Substation substation);

    @Mapping(target = "bays", qualifiedByName = "BayMapperSubstationByIdToDto")
    SubstationDto substationByIdToDto(Substation substation);

    @Mapping(target = "bays", qualifiedByName = "BayMapperSubstationBySubstationIdAndBayIdToDto")
    SubstationDto substationBySubstationIdAndBayIdToDto(Substation substation);
}
