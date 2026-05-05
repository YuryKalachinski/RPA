package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.dictionary.ParameterDictionary;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParameterDictionaryRepo extends CrudRepository<ParameterDictionary, Long> {

    Optional<ParameterDictionary> findByKey(String key);

    @QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
    @Query("SELECT pd FROM ParameterDictionary pd")
    List<ParameterDictionary> getAll();
}
