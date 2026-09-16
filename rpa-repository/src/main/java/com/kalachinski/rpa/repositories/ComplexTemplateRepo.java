package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.dictionary.ComplexTemplate;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplexTemplateRepo extends CrudRepository<ComplexTemplate, Long> {

    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    @Query("SELECT ct FROM ComplexTemplate ct " +
            "LEFT JOIN FETCH ct.complex c " +
            "LEFT JOIN FETCH c.protections p " +
            "LEFT JOIN FETCH p.parameterSettings ps " +
            "LEFT JOIN FETCH p.children ch"
    )
    List<ComplexTemplate> getAll();
}
