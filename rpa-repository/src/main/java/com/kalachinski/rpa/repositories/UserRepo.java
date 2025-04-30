package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {

    //todo disabled sql-show in properties after all

    @Override
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.role r LEFT JOIN FETCH r.permissions")
    List<User> findAll();

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.role r LEFT JOIN FETCH r.permissions WHERE u.email= :email")
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.role r WHERE u.isTelegramUser=true")
    List<User> findAllTelegramBotUser();

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.role r LEFT JOIN FETCH r.permissions WHERE u.telegramUserId= :id")
    Optional<User> findByTelegramBotUserId(Long id);
}
