package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.Event;
import org.telegram.telegrambots.meta.api.objects.Update;

public interface ConsumerService {

    void consumeScanDbMessage(Event event);

    void consumeTextMessage(Update update);
}
