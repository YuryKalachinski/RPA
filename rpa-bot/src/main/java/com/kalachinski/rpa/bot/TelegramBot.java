package com.kalachinski.rpa.bot;

import com.kalachinski.rpa.configuration.TelegramBotProperties;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramWebhookBot;
import org.telegram.telegrambots.meta.api.methods.BotApiMethod;
import org.telegram.telegrambots.meta.api.methods.updates.SetWebhook;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Slf4j
@Component
public class TelegramBot extends TelegramWebhookBot {

    private final TelegramBotProperties telegramBotProperties;

    public TelegramBot(TelegramBotProperties telegramBotProperties) {
        super(telegramBotProperties.getTelegramBotToken());
        this.telegramBotProperties = telegramBotProperties;
    }

    @PostConstruct
    private void init() {
        try {
            var setWebHook = SetWebhook.builder()
                    .url(telegramBotProperties.getTelegramBotUri())
                    .build();
            this.setWebhook(setWebHook);
        } catch (TelegramApiException e) {
            log.error(e.toString());
        }
    }

    public void sendAnswerMessage(BotApiMethod<?> botApiMethod) {
        if (botApiMethod != null) {
            try {
                execute(botApiMethod);
            } catch (TelegramApiException e) {
                //todo throw custom exception
                log.error("Can't send answer message, {}", e.toString());
                throw new RuntimeException();
            }
        }
    }

    @Override
    public String getBotUsername() {
        return telegramBotProperties.getTelegramBotName();
    }

    @Override
    public String getBotPath() {
        return "/update";
    }

    @Override
    public BotApiMethod<?> onWebhookUpdateReceived(Update update) {
        return null;
    }
}
