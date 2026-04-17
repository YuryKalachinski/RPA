package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.substation.Bay;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BayRepo extends CrudRepository<Bay, Long> {

    @QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
    @Query("SELECT b FROM Bay b " +
            "LEFT JOIN FETCH b.substation s" +
            "LEFT JOIN FETCH b.complexes c " +
            "LEFT JOIN FETCH c.protections p " +
            "LEFT JOIN FETCH p.parameterSettings " +
            "LEFT JOIN FETCH p.children ch " +
            "WHERE b.id= :bay_id ")
    Optional<Bay> getByIdWithChildren(@Param("bay_id") Long id);

    @QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
    @Query("SELECT b FROM Bay b " +
            "LEFT JOIN FETCH b.substation " +
            "WHERE b.id= :bay_id ")
    Optional<Bay> getById(@Param("bay_id") Long id);
}
