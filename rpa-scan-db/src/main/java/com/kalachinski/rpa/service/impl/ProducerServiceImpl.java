package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.model.Event;
import com.kalachinski.rpa.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProducerServiceImpl implements ProducerService {

    @Value("${spring.rabbitmq.queues.scan-db-message}")
    private String scanDbMessage;

    private final RabbitTemplate rabbitTemplate;

    @Override
    public void produce(Event event) {
        rabbitTemplate.convertAndSend(scanDbMessage, event);
    }
}
