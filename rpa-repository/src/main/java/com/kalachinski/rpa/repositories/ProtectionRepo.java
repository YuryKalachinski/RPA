package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.substation.Protection;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProtectionRepo extends CrudRepository<Protection, Long> {

    @EntityGraph(attributePaths = {"children"})
    @Query("SELECT p FROM Protection p")
    List<Protection> findAll();
}
