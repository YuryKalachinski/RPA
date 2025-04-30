package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.MailParams;
import com.kalachinski.rpa.service.MailSenderService;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderServiceImpl implements MailSenderService {

    @Value("${spring.mail.username}")
    private String emailFrom;
    @Value("${service.activation.uri}")
    private String activationServiceUri;

    private final JavaMailSender javaMailSender;

    public MailSenderServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void send(MailParams mailParams) {
        var subject = "Telegram Account activation.";
        var id = mailParams.getId();
        var email = mailParams.getMailTo();
        var messageBody = getActivationMailBody(id, email);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailFrom);
        message.setSubject(subject);
        message.setText(messageBody);
        message.setTo(decode(email));

        //todo for testing
        System.out.println(messageBody);

        javaMailSender.send(message);
    }

    private String getActivationMailBody(String id, String email) {
        var message = String.format("To finish activation your Account use next link:\n%s", activationServiceUri);
        return message.replace("{id}", id).replace("{email}", email);
    }

    private String decode(String string) {
        return new String(Base64.decodeBase64(string.getBytes()));
    }
}
