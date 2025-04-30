package com.kalachinski.rpa.service;

import com.kalachinski.rpa.dto.MailParams;

public interface ConsumerService {

    public void consume(MailParams mailParams);
}
