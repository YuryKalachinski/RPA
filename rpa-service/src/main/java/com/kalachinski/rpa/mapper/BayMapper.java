package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.bay.BayDto;
import com.kalachinski.rpa.model.substation.Bay;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE
)
public interface BayMapper {

    //    from SubstationMapper
    @Named("BayMapperSubstationWithBay")
    @Mappings({
            @Mapping(target = "complexes", ignore = true)})
    BayDto toDtoWithoutComplexes(Bay bay);

    BayDto toDtoWithComplexes(Bay bay);

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
