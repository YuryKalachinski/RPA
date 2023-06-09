package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends CrudRepository<Role, Long> {

    Optional<Role> findByCode(String code);
}
