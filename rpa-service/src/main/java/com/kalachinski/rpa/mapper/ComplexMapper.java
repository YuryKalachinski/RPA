package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.model.substation.Complex;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ComplexMapper {

    ComplexDto toDto(Complex entity);

    void updateEntityFromDto(ComplexDto dto, @MappingTarget Complex entity);

    Complex toEntity(ComplexDto dto);

    @AfterMapping
    default void filterDto(@MappingTarget ComplexDto dto) {
        dto.getProtections()
                .removeIf(protection -> !protection.isRoot());
    }
}
