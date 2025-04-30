package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.Event;

public interface ProducerService {

    void produce(Event event);
}
