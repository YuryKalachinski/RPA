package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.protection.ProtectionDto;
import com.kalachinski.rpa.dto.protection.ProtectionSimpleDto;
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
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = ParameterSettingMapper.class)
public interface ProtectionMapper {

    //    MAPPING to ENTITY

    @Named("updateProtectionSetFromDto")
    default Set<Protection> updateProtectionSetFromDto(Set<ProtectionDto> dtos, @MappingTarget Set<Protection> protections) {
        for (ProtectionDto dto : dtos) {
            if (dto == null) {
                continue;
            }
            Protection protection;
            if (dto.getId() != null) {
                protection = protections.stream()
                        .filter(el -> dto.getId().equals(el.getId()))
                        .findAny()
                        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                                String.format("Unable to find resource with requested id=%d", dto.getId())));
            } else {
                protection = new Protection();
                protections.add(protection);
            }
            updateProtectionFields(dto, protection);
        }
        return protections;
    }

    @Mappings({
            @Mapping(target = "trips", ignore = true),
            @Mapping(target = "children", source = "children", qualifiedByName = "updateProtectionSetFromDto"),
            @Mapping(target = "parameterSettings", source = "parameterSettings", qualifiedByName = "updateParameterSettingSetFromDto"),
            @Mapping(target = "deleted", source = "isDeleted"),
            @Mapping(target = "root", source = "isRoot")
    })
    void updateProtectionFields(ProtectionDto dto, @MappingTarget Protection target);

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

    @Mappings({
            @Mapping(target = "isDeleted", source = "deleted"),
            @Mapping(target = "isRoot", source = "root")
    })
    ProtectionDto toDto(Protection protection);

    ProtectionSimpleDto toSimpleDto(Protection protection);
}
