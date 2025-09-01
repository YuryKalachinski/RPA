package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Event;
import com.kalachinski.rpa.service.ConsumerService;
import com.kalachinski.rpa.service.MessageDistribute;
import com.kalachinski.rpa.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.objects.Update;

@RequiredArgsConstructor
@Service
public class ConsumerServiceImpl implements ConsumerService {

    private final MessageDistribute messageDistribute;
    private final ProducerService producerService;

    @Override
    @RabbitListener(queues = "${spring.rabbitmq.queues.scan-db-message}")
    public void consumeScanDbMessage(Event event) {
        System.out.println("Scan db message");
        messageDistribute.distributeScanDbMessage(event);
    }

    @Override
    @RabbitListener(queues = "${spring.rabbitmq.queues.text-message}")
    public void consumeTextMessage(Update update) {
        messageDistribute.distributeTextMessage(update);
    }
}
