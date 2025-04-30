package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.bot.TelegramBot;
import com.kalachinski.rpa.service.ConsumerService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

@RequiredArgsConstructor
@Service
public class ConsumerServiceImpl implements ConsumerService {

    private final TelegramBot telegramBot;

    @Override
    @RabbitListener(queues = "${spring.rabbitmq.queues.answer-message}")
    public void consume(SendMessage sendMessage) {
        telegramBot.sendAnswerMessage(sendMessage);
    }
}
