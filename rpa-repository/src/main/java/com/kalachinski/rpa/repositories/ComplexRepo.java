package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.substation.Complex;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ComplexRepo extends CrudRepository<Complex, Long> {

    //todo remove from query bay and substation

    @QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
    @Query("SELECT c FROM Complex c " +
            "LEFT JOIN FETCH c.bay b " +
            "LEFT JOIN FETCH b.substation s " +
            "LEFT JOIN FETCH c.protections p " +
            "LEFT JOIN FETCH p.parameterSettings ps " +
            "LEFT JOIN FETCH p.children ch " +
            "WHERE c.id= :complex_id ")
    Optional<Complex> getByIdWithChildren(@Param("complex_id") Long id);
}
