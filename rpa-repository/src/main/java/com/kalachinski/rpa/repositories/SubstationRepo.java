package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Substation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SubstationRepo extends CrudRepository<Substation, Long> {

    Set<Substation> findAll();
}
