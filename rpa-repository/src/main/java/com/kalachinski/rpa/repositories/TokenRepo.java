package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Token;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepo extends CrudRepository<Token, Long> {

    @Query("SELECT t FROM Token t JOIN FETCH t.user u JOIN FETCH u.role WHERE u.id= :userId AND t.isExpired=false AND t.isRevoked=false")
    List<Token> findAllValidTokensByUser(Long userId);

    @Query("SELECT t FROM Token t JOIN FETCH t.user u JOIN FETCH u.role r JOIN FETCH r.permissions WHERE t.token= :token")
    Optional<Token> findByToken(String token);
}
