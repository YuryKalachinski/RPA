package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.MailParams;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

public interface ProducerService {

    void sendMessageToBot(SendMessage sendMessage);

    void sendMessageToMailService(MailParams mailParams);
}
