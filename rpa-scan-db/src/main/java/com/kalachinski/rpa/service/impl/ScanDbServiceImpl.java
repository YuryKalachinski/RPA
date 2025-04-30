package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Event;
import com.kalachinski.rpa.repositories.EventRepo;
import com.kalachinski.rpa.service.ProducerService;
import com.kalachinski.rpa.service.ScanDbService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@EnableScheduling
@Service
public class ScanDbServiceImpl implements ScanDbService {

    private final EventRepo eventRepo;
    private final ProducerService producerService;
    private Event event;

    public ScanDbServiceImpl(EventRepo eventRepo, ProducerService producerService) {
        this.eventRepo = eventRepo;
        this.producerService = producerService;
    }

    @Scheduled(fixedRate = 10000)
    @Override
    public void scanDb() {
        //todo research new event in DB
        Long id = event == null ? 0 : event.getId();
        List<Event> eventList = eventRepo.findListEventByEventId(id);
        for (Event newEvent : eventList) {
            producerService.produce(newEvent);
            if (event == null || event.getId() < newEvent.getId()) {
                event = newEvent;
            }
        }
    }
}

