package com.kalachinski.rpa.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class TelegramBotProperties {

    @Value("${telegram.bot.name}")
    private String telegramBotName;

    @Value("${telegram.bot.token}")
    private String telegramBotToken;

    @Value("${telegram.bot.uri}")
    private String telegramBotUri;
}
