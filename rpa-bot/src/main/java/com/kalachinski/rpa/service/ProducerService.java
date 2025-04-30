package com.kalachinski.rpa.service;

import org.telegram.telegrambots.meta.api.objects.Update;

public interface ProducerService {

    void produce(String queue, Update update);
}
