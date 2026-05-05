package com.kalachinski.rpa.mapper;

import com.kalachinski.rpa.dto.dictionary.ProtectionDictionaryDto;
import com.kalachinski.rpa.model.dictionary.ProtectionDictionary;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProtectionDictionaryMapper {

    List<ProtectionDictionaryDto> toListDto(List<ProtectionDictionary> listEntity);

    ProtectionDictionaryDto toDto(ProtectionDictionary entity);

    ProtectionDictionary toEntity(ProtectionDictionaryDto dto);
}
