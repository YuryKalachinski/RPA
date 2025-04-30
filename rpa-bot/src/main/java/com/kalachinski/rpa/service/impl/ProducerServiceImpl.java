package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.objects.Update;

@RequiredArgsConstructor
@Service
public class ProducerServiceImpl implements ProducerService {

    private final RabbitTemplate rabbitTemplate;

    @Override
    public void produce(String queue, Update update) {
        rabbitTemplate.convertAndSend(queue, update);
    }
}
