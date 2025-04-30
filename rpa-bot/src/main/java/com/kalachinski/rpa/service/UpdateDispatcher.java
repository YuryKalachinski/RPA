package com.kalachinski.rpa.service;

import com.kalachinski.rpa.bot.TelegramBot;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

@Slf4j
@RequiredArgsConstructor
@Service
public class UpdateDispatcher {

    @Value("${spring.rabbitmq.queues.text-message}")
    private String textMessageQueue;

    private final ProducerService producerService;
    private final TelegramBot telegramBot;

    public void distribute(Update update) {
        if (update == null) {
            log.error("Received update is null");
            return;
        }
        if (!update.hasMessage()) {
            sendUnsupportedMessage(update);
            return;
        }
        distributeMessagesByType(update);
    }

    private void distributeMessagesByType(Update update) {
        var message = update.getMessage();
        if (message.hasText()) {
            processTextMessage(update);
            return;
        }

        //todo add different type of messages
//        if (message.hasDocument()) {
//            processDocMessage(update);
//            return;
//        }
//        if (message.hasPhoto()) {
//            processPhotoMessage(update);
//            return;
//        }
        sendUnsupportedMessage(update);
    }

    private void processTextMessage(Update update) {
        producerService.produce(textMessageQueue, update);
    }

    private void sendUnsupportedMessage(Update update) {
        log.error("Unsupported message type is received: {}", update);
        var message = update.getMessage();
        var sendMessage = new SendMessage();
        sendMessage.setChatId(message.getChatId());
        sendMessage.setText("Неподдерживаемый тип сообщения!");
        telegramBot.sendAnswerMessage(sendMessage);
    }
}
