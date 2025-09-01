package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.MailParams;
import com.kalachinski.rpa.model.Crap;
import com.kalachinski.rpa.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProducerServiceImpl implements ProducerService {

    @Value("${spring.rabbitmq.queues.answer-message}")
    private String answerMessage;

    @Value("${spring.rabbitmq.queues.mail-service-message}")
    private String mailServiceMessage;

    @Value("${spring.rabbitmq.queues.resp-list-connections}")
    private String respListConnections;

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
