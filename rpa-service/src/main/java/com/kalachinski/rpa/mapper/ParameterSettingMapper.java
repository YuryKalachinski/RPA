package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.ParameterSettingDto;
import com.kalachinski.rpa.model.substation.ParameterSetting;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ParameterSettingMapper {

    //    MAPPING to ENTITY

    @Named("updateParameterSettingSetFromDto")
    default Set<ParameterSetting> updateParameterSettingsFromDto(Set<ParameterSettingDto> dtos, @MappingTarget Set<ParameterSetting> parameterSettings) {
        for (ParameterSettingDto dto : dtos) {
            if (dto == null) {
                continue;
            }
            ParameterSetting parameterSetting;
            if (dto.getId() != null) {
                parameterSetting = parameterSettings.stream()
                        .filter(el -> dto.getId().equals(el.getId()))
                        .findAny()
                        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND,
                                String.format("Unable to find resource with requested id=%d", dto.getId())));
            } else {
                parameterSetting = new ParameterSetting();
                parameterSettings.add(parameterSetting);
            }
            updateParameterSettingFields(dto, parameterSetting);
        }
        return parameterSettings;
    }

    @Mapping(target = "deleted", source = "isDeleted")
    void updateParameterSettingFields(ParameterSettingDto dto, @MappingTarget ParameterSetting parameterSetting);

    //    MAPPING to DTO

    @Mapping(target = "isDeleted", source = "deleted")
    ParameterSettingDto toDto(ParameterSetting parameterSetting);
}
