package com.kalachinski.rpa.repositories;

import com.kalachinski.rpa.model.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepo extends CrudRepository<Event, Long> {

    @Query(value = "SELECT e FROM Event e WHERE e.id > :id")
    List<Event> findListEventByEventId(Long id);
}
