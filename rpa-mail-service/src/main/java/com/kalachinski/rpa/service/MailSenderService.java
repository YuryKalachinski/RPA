package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.MailParams;

public interface MailSenderService {

    void send(MailParams mailParams);
}
