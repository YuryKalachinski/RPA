package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.dictionary.ParameterDictionaryDto;
import com.kalachinski.rpa.model.dictionary.ParameterDictionary;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParameterDictionaryMapper {

    List<ParameterDictionaryDto> toListDto(List<ParameterDictionary> listEntity);

    ParameterDictionaryDto toDto(ParameterDictionary entity);

    ParameterDictionary toEntity(ParameterDictionaryDto dto);
}
