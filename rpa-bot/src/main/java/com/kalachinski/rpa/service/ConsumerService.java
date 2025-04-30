package com.kalachinski.rpa.service;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

public interface ConsumerService {

    void consume(SendMessage sendMessage);
}
