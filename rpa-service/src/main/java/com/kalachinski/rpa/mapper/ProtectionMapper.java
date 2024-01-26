package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.ProtectionDto;
import com.kalachinski.rpa.model.Protection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE
)
public interface ProtectionMapper {

    @Named("ProtectionMapperSubstationBySubstationIdAndBayIdToDto")
    @Mapping(target = "trips", ignore = true)
    ProtectionDto substationBySubstationIdAndBayIdToDto(Protection protection);
}
