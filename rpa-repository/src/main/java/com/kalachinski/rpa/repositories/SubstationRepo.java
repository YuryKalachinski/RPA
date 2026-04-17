package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.substation.Substation;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubstationRepo extends CrudRepository<Substation, Long> {

    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    @Query("SELECT s FROM Substation s")
    List<Substation> getAll();

    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    @Query("SELECT s FROM Substation s LEFT JOIN FETCH s.bays b LEFT JOIN FETCH b.complexes WHERE s.id= :id")
    Optional<Substation> getById(@Param("id") Long id);
}
