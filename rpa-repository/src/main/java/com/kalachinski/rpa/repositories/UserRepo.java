package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.role r JOIN FETCH r.permissions")
    List<User> findAll();

    @Query("SELECT u FROM User u JOIN FETCH u.role r JOIN FETCH r.permissions WHERE u.email= :email")
    Optional<User> findByEmail(String email);
}
