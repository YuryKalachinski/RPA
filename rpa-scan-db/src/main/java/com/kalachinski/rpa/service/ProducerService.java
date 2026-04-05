package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.substation.Event;

public interface ProducerService {

    void produce(Event event);
}
