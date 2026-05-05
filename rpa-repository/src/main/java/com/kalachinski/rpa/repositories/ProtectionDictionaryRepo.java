package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.dictionary.ProtectionDictionary;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProtectionDictionaryRepo extends CrudRepository<ProtectionDictionary, Long> {

    Optional<ProtectionDictionary> findByName(String name);

    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    @Query("SELECT pd FROM ProtectionDictionary pd")
    List<ProtectionDictionary> getAll();
}
