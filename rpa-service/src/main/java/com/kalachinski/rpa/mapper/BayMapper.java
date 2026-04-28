package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.model.substation.Bay;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = ComplexMapper.class)
public interface BayMapper {

    //    MAPPING to ENTITY
    @Mapping(target = "deleted", source = "isDeleted")
    Bay toEntity(BayDto dto, @MappingTarget Bay bay);

//    MAPPING to DTO

    //    from SubstationMapper
    @Named("BayMapperSubstationWithBay")
    @Mappings({
            @Mapping(target = "complexes", ignore = true),
            @Mapping(target = "isDeleted", source = "deleted")
    })
    BayDto toDtoWithoutComplexes(Bay bay);

    @Mapping(target = "isDeleted", source = "deleted")
    BayDto toDtoWithComplexes(Bay bay);

    @AfterMapping
    default void filterDtoWithComplexes(@MappingTarget BayDto dto) {
        if (dto.getComplexes() != null)
            dto.getComplexes()
                    .forEach(complex -> {
                        complex.getProtections()
                                .removeIf(protection -> !protection.getIsRoot());
                    });
    }
}
