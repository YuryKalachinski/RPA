package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.BayDto;
import com.kalachinski.rpa.model.Bay;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {ComplexMapper.class}
)
public interface BayMapper {

    @Named("BayMapperSubstationByIdToDto")
    @Mapping(target = "trips", ignore = true)
    @Mapping(target = "complexes", qualifiedByName = "ComplexMapperSubstationByIdToDto")
    BayDto substationByIdToDto(Bay bay);

    @Named("BayMapperSubstationBySubstationIdAndBayIdToDto")
    @Mapping(target = "trips", ignore = true)
    @Mapping(target = "complexes", qualifiedByName = "ComplexMapperSubstationBySubstationIdAndBayIdToDto")
    BayDto substationBySubstationIdAndBayIdToDto(Bay bay);
}
