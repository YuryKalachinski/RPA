package com.kalachinski.rpa.service;

import com.kalachinski.rpa.model.Event;
import org.telegram.telegrambots.meta.api.objects.Update;

public interface MessageDistribute {

    void distributeScanDbMessage(Event event);

    void distributeTextMessage(Update update);
}
