package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Crap;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CrapRepo extends CrudRepository<Crap, Long> {

    @Query("SELECT c FROM Crap c WHERE c.isActive=true")
    List<Crap> findAllActive();

    List<Crap> findAll();
}
