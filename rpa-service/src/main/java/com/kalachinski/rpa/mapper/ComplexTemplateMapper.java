package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.ParameterSettingDto;
import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.dto.complex.ComplexTemplateDto;
import com.kalachinski.rpa.dto.protection.ProtectionDto;
import com.kalachinski.rpa.model.dictionary.ComplexTemplate;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {ComplexMapper.class}
)
public interface ComplexTemplateMapper {

    //    MAPPING to ENTITY


    //    MAPPING to DTO

    ComplexTemplateDto toDto(ComplexTemplate entity);

    List<ComplexTemplateDto> toDtoList(List<ComplexTemplate> entities);

    //todo is it necessary (may be do it on the front)?

    @AfterMapping
    default void filterDto(@MappingTarget ComplexTemplateDto dto) {
        ComplexDto complex = dto.getComplex();
        if (complex != null) {
            complex.setId(null);
            filterDtoProtections(complex.getProtections());
        }
    }

    default void filterDtoProtections(Set<ProtectionDto> dtoSet) {
        if (dtoSet != null) {
            for (ProtectionDto protectionDto : dtoSet) {
                protectionDto.setId(null);
                protectionDto.setParent(null);
                protectionDto.getComplex().setId(null);
                filterDtoProtections(protectionDto.getChildren());
                filterDtoParameterSettings(protectionDto.getParameterSettings());
            }
        }
    }

    default void filterDtoParameterSettings(Set<ParameterSettingDto> dtoSet) {
        if (dtoSet != null) {
            for (ParameterSettingDto protectionDto : dtoSet) {
                protectionDto.setId(null);
                protectionDto.getProtection().setId(null);
            }
        }
    }
}
