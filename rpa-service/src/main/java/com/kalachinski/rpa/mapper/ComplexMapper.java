package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.ParameterSettingDto;
import com.kalachinski.rpa.dto.complex.ComplexDto;
import com.kalachinski.rpa.dto.protection.ProtectionDto;
import com.kalachinski.rpa.dto.protection.ProtectionSimpleDto;
import com.kalachinski.rpa.model.substation.Complex;
import com.kalachinski.rpa.model.substation.ParameterSetting;
import com.kalachinski.rpa.model.substation.Protection;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ComplexMapper {

//    MAPPING to ENTITY

    @Mappings({
            @Mapping(target = "protections", qualifiedByName = "updateProtectionSetFromDto"),
    })
    Complex toEntity(ComplexDto dto, @MappingTarget Complex complex);

    @Named("updateProtectionSetFromDto")
    default Set<Protection> updateProtectionSetFromDto(Set<ProtectionDto> dtos, @MappingTarget Set<Protection> protections) {
        for (ProtectionDto dto : dtos) {
            Protection target;
            if (dto.getId() != null) {
                target = protections.stream()
                        .filter(el -> dto.getId().equals(el.getId()))
                        .findAny()
                        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                                String.format("Unable to find resource with requested id=%d", dto.getId())));
            } else {
                target = new Protection();
                protections.add(target);
            }
            updateProtectionFields(dto, target);
        }
        return protections;
    }

    @Mappings({
            @Mapping(target = "trips", ignore = true),
            @Mapping(target = "children", source = "children", qualifiedByName = "updateProtectionSetFromDto"),
            @Mapping(target = "parameterSettings", source = "parameterSettings", qualifiedByName = "updateParameterSettingSetFromDto"),
    })
    void updateProtectionFields(ProtectionDto dto, @MappingTarget Protection target);

    @Named("updateParameterSettingSetFromDto")
    default Set<ParameterSetting> updateParameterSettingsFromDto(Set<ParameterSettingDto> dtos, @MappingTarget Set<ParameterSetting> parameterSettings) {
        for (ParameterSettingDto dto : dtos) {
            ParameterSetting target;
            if (dto.getId() != null) {
                target = parameterSettings.stream()
                        .filter(el -> dto.getId().equals(el.getId()))
                        .findAny()
                        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                                String.format("Unable to find resource with requested id=%d", dto.getId())));
            } else {
                target = new ParameterSetting();
                parameterSettings.add(target);
            }
            updateParameterSettingFields(dto, target);
        }
        return parameterSettings;
    }

    void updateParameterSettingFields(ParameterSettingDto dto, @MappingTarget ParameterSetting parameterSetting);

    @AfterMapping
    default void linkProtections(@MappingTarget Complex complex) {
        if (complex.getProtections() != null) {
            complex.getProtections().forEach(complex::addProtection);
        }
    }

    @AfterMapping
    default void linkProtectionsAndChildren(@MappingTarget Protection protection) {
        if (protection.getParameterSettings() != null) {
            protection.getParameterSettings().forEach(protection::addParameterSetting);
        }
        if (protection.getChildren() != null) {
            protection.getChildren().forEach(protection::addChild);
        }
    }

//    MAPPING to DTO

    ComplexDto toDto(Complex entity);

    @AfterMapping
    default void filterDto(@MappingTarget ComplexDto dto) {
        if (dto.getProtections() != null) {
            dto.getProtections()
                    .removeIf(protection -> !protection.getIsRoot());
        }
    }

    ProtectionDto toDto(Protection protection);

    ProtectionSimpleDto toSimpleDto(Protection protection);
}
