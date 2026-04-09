package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.dto.substation.SubstationDto;
import com.kalachinski.rpa.model.substation.Bay;
import com.kalachinski.rpa.model.substation.Substation;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BayMapper {

    //    from SubstationMapper
    @Named("BayMapperSubstationWithBay")
    @Mappings({
            @Mapping(target = "complexes", ignore = true)})
    BayDto toDtoWithoutComplexes(Bay bay);

    BayDto toDtoWithComplexes(Bay bay);

    void updateEntityFromDto(BayDto dto, @MappingTarget Bay bay);

    Bay toEntity (BayDto dto);

    @AfterMapping
    default void filterDtoWithComplexes(@MappingTarget BayDto dto) {
        if (dto.getComplexes() != null)
            dto.getComplexes()
                    .forEach(complex -> {
                        complex.getProtections()
                                .removeIf(protection -> !protection.isRoot());
                    });
    }
}
