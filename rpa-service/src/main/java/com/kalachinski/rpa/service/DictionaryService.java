package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.dictionary.ParameterDictionaryDto;
import com.kalachinski.rpa.dto.dictionary.ProtectionDictionaryDto;

import java.util.List;

public interface DictionaryService {

    List<ProtectionDictionaryDto> getAllProtections();

    List<ParameterDictionaryDto> getAllParameters();
}
