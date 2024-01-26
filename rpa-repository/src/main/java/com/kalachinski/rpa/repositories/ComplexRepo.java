package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Complex;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplexRepo extends CrudRepository<Complex, Long> {
}
