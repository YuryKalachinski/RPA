package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.dictionary.ComplexTemplate;
import com.kalachinski.rpa.model.substation.Complex;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    @QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
    @Query("SELECT ct FROM ComplexTemplate ct " +
            "LEFT JOIN FETCH ct.complex c " +
            "LEFT JOIN FETCH c.protections p " +
            "LEFT JOIN FETCH p.parameterSettings ps " +
            "LEFT JOIN FETCH p.children ch " +
            "WHERE ct.id= :complexTemplate_id ")
    Optional<ComplexTemplate> getByIdWithChildren(@Param("complexTemplate_id") Long id);
}
