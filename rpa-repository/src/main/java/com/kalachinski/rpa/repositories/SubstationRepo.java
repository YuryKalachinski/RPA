package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Substation;
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

    @Override
    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    List<Substation> findAll();

    @Override
    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    @Query("SELECT s FROM Substation s LEFT JOIN FETCH s.bays b LEFT JOIN FETCH b.complexes WHERE s.id= :id")
    Optional<Substation> findById(@Param("id") Long id);

    @QueryHints({@QueryHint(name="org.hibernate.cacheable", value="true")})
    @Query("SELECT s FROM Substation s " +
            "LEFT JOIN FETCH s.bays b " +
            "LEFT JOIN FETCH b.complexes c " +
            "LEFT JOIN FETCH c.protections p " +
            "LEFT JOIN FETCH p.parameterSettings ps " +
            "WHERE s.id= :substation_id AND b.id= :bay_id")
    Optional<Substation> getBayBySubstationIdAndBayId(@Param("substation_id") Long substationId,
                                                      @Param("bay_id") Long bayId);
}
