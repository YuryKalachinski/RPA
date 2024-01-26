package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.ComplexDto;
import com.kalachinski.rpa.model.Complex;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {ProtectionMapper.class}
)
public interface ComplexMapper {

    @Named("ComplexMapperSubstationByIdToDto")
    @Mapping(target = "protections", ignore = true)
    ComplexDto substationByIdToDto(Complex complex);

    @Named("ComplexMapperSubstationBySubstationIdAndBayIdToDto")
    @Mapping(target = "protections", qualifiedByName = "ProtectionMapperSubstationBySubstationIdAndBayIdToDto")
    ComplexDto substationBySubstationIdAndBayIdToDto(Complex complex);
}
