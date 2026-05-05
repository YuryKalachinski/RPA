package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.dictionary.ParameterDictionaryDto;
import com.kalachinski.rpa.dto.dictionary.ProtectionDictionaryDto;
import com.kalachinski.rpa.mapper.ParameterDictionaryMapper;
import com.kalachinski.rpa.mapper.ProtectionDictionaryMapper;
import com.kalachinski.rpa.repositories.ParameterDictionaryRepo;
import com.kalachinski.rpa.repositories.ProtectionDictionaryRepo;
import com.kalachinski.rpa.service.DictionaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DictionaryServiceImpl implements DictionaryService {

    private final ProtectionDictionaryRepo protectionDictionaryRepo;
    private final ProtectionDictionaryMapper protectionDictionaryMapper;
    private final ParameterDictionaryRepo parameterDictionaryRepo;
    private final ParameterDictionaryMapper parameterDictionaryMapper;

    @Override
    public List<ProtectionDictionaryDto> getAllProtections() {
        return protectionDictionaryMapper.toListDto(protectionDictionaryRepo.getAll());
    }

    @Override
    public List<ParameterDictionaryDto> getAllParameters() {
        return parameterDictionaryMapper.toListDto(parameterDictionaryRepo.getAll());
    }
}
