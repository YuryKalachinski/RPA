package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.MailParams;
import com.kalachinski.rpa.service.ConsumerService;
import com.kalachinski.rpa.service.MailSenderService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerServiceImpl implements ConsumerService {

    private final MailSenderService mailSenderService;

    public ConsumerServiceImpl(MailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }

    @Override
    @RabbitListener(queues = "${spring.rabbitmq.queues.mail-service-message}")
    public void consume(MailParams mailParams) {
        mailSenderService.send(mailParams);
    }
}
