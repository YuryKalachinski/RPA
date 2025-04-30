package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.MailParams;
import com.kalachinski.rpa.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

@RequiredArgsConstructor
@Service
public class ProducerServiceImpl implements ProducerService {

    @Value("${spring.rabbitmq.queues.answer-message}")
    private String answerMessage;

    @Value("${spring.rabbitmq.queues.mail-service-message}")
    private String mailServiceMessage;

    private final RabbitTemplate rabbitTemplate;

    @Override
    public void sendMessageToBot(SendMessage sendMessage) {
        rabbitTemplate.convertAndSend(answerMessage, sendMessage);
    }

    @Override
    public void sendMessageToMailService(MailParams mailParams) {
        rabbitTemplate.convertAndSend(mailServiceMessage, mailParams);
    }
}
