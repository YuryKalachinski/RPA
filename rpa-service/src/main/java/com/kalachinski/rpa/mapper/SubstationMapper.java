package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.model.substation.Substation;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {BayMapper.class}
)
public interface SubstationMapper {

    @IterableMapping(qualifiedByName = "withoutBays")
    List<SubstationDto> toDtoList(List<Substation> substations);

    @Named("withoutBays")
    @Mapping(target = "bays", ignore = true)
    SubstationDto toDtoWithoutBays(Substation substation);

    @Mapping(target = "bays", qualifiedByName = "BayMapperSubstationWithBay")
    SubstationDto toDtoWithBays(Substation substation);

    void updateEntityFromDto(SubstationDto dto, @MappingTarget Substation substation);

    Substation toEntity (SubstationDto dto);
}
