package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Bay;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BayRepo extends CrudRepository<Bay, Long> {
}
