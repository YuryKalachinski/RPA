package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {

    @Query("SELECT u, r FROM User u INNER JOIN Role r ON r.id = u.role")
    List<User> findAll();
}
