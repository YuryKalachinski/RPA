package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.model.substation.Substation;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {BayMapper.class}
)
public interface SubstationMapper {

//    MAPPING to ENTITY

    @Mapping(target = "deleted", source = "isDeleted")
    Substation toEntity(SubstationDto dto, @MappingTarget Substation substation);

//    MAPPING to DTO

    @IterableMapping(qualifiedByName = "withoutBays")
    List<SubstationDto> toDtoList(List<Substation> substations);

    @Named("withoutBays")
    @Mappings({
            @Mapping(target = "bays", ignore = true),
            @Mapping(target = "isDeleted", source = "deleted")
    })
    SubstationDto toDtoWithoutBays(Substation substation);

    @Mappings({
            @Mapping(target = "bays", qualifiedByName = "BayMapperSubstationWithBay"),
            @Mapping(target = "isDeleted", source = "deleted")
    })
    SubstationDto toDtoWithBays(Substation substation);
}
