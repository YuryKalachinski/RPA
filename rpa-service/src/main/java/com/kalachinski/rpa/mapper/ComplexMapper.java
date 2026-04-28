package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.model.substation.Complex;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = ProtectionMapper.class)
public interface ComplexMapper {

    //    MAPPING to ENTITY

    @Mappings({
            @Mapping(target = "protections", qualifiedByName = "updateProtectionSetFromDto"),
            @Mapping(target = "deleted", source = "isDeleted")
    })
    Complex toEntity(ComplexDto dto, @MappingTarget Complex complex);

    @AfterMapping
    default void linkProtections(@MappingTarget Complex complex) {
        if (complex.getProtections() != null) {
            complex.getProtections().forEach(complex::addProtection);
        }
    }

    //    MAPPING to DTO

    @Mapping(target = "isDeleted", source="deleted")
    ComplexDto toDto(Complex entity);

    @AfterMapping
    default void filterDto(@MappingTarget ComplexDto dto) {
        if (dto.getProtections() != null) {
            dto.getProtections()
                    .removeIf(protection -> !protection.getIsRoot());
        }
    }
}
