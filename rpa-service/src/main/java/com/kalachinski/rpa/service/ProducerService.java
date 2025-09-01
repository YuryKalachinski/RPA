package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.MailParams;
import com.kalachinski.rpa.model.Crap;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import java.util.List;

public interface ProducerService {

    void sendMessageToBot(SendMessage sendMessage);

    void sendMessageToMailService(MailParams mailParams);
}
