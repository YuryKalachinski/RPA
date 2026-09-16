package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.model.substation.Complex;
import com.kalachinski.rpa.model.substation.Protection;
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
//            complex.getProtections().forEach(complex::addProtection);
            complex.getProtections().forEach(protection -> {
                protection.setComplex(complex);
                linkProtectionTree(protection, complex);
            });
        }
    }

    default void linkProtectionTree(Protection current, Complex complex) {
        if (current.getChildren() != null) {
            current.getChildren().forEach(child -> {
                child.setParent(current); // Гарантируем связь с родителем
                child.setComplex(complex); // Передаем ссылку на Complex вглубь дерева

                // Идем глубже по дереву (для бесконечной вложенности защит)
                linkProtectionTree(child, complex);
            });
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
