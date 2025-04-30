package com.kalachinski.rpa.configuration;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Value("${spring.rabbitmq.queues.scan-db-message}")
    private String scanDbMessageQueue;

    @Value("${spring.rabbitmq.queues.answer-message}")
    private String answerMessageQueue;

    @Value("${spring.rabbitmq.queues.text-message}")
    private String textMessageQueue;

    @Value("${spring.rabbitmq.queues.mail-service-message}")
    private String mailServiceMessageQueue;

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Queue getScanDbMessageQueue() {
        return new Queue(scanDbMessageQueue);
    }

    @Bean
    public Queue getAnswerMessageQueue() {
        return new Queue(answerMessageQueue);
    }

    @Bean
    public Queue getTextMessageQueue() {
        return new Queue(textMessageQueue);
    }

    @Bean
    public Queue getMailServiceMessageQueue() {
        return new Queue(mailServiceMessageQueue);
    }
}
