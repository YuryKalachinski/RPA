package com.kalachinski.rpa.service.impl;

import com.kalachinski.rpa.dto.MailParams;
import com.kalachinski.rpa.model.Event;
import com.kalachinski.rpa.model.Role;
import com.kalachinski.rpa.model.Status;
import com.kalachinski.rpa.model.User;
import com.kalachinski.rpa.service.MessageDistribute;
import com.kalachinski.rpa.service.ProducerService;
import com.kalachinski.rpa.service.RoleService;
import com.kalachinski.rpa.service.UserService;
import com.kalachinski.rpa.service.enums.ServiceCommand;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

import java.util.List;

import static com.kalachinski.rpa.service.enums.ViewCommand.DEFAULT_COMMANDS_LIST;
import static com.kalachinski.rpa.service.enums.ViewCommand.GREETING_COMMAND;
import static com.kalachinski.rpa.service.enums.ViewCommand.HELP_COMMAND;

@RequiredArgsConstructor
@Service
public class MessageDistributeImpl implements MessageDistribute {

    private static final String COMMAND_SPLIT_REGEX = ":";

    private final UserService userService;
    private final RoleService roleService;
    private final ProducerService producerService;

    @Override
    public void distributeScanDbMessage(Event event) {
        var allTelegramBotUsers = userService.findAllTelegramBotUser();
        var listUserId = getListUserId(allTelegramBotUsers);
        for (Long id : listUserId) {
            sendMessageToBot(event.getName(), id);
        }
    }

    @Transactional
    @Override
    public void distributeTextMessage(Update update) {
        var message = update.getMessage();
        if (message == null) {
            return;
        }
        if (message.isCommand()) {
            resolveCommandMessage(update);
            return;
        }
        resolveTextMessage(update);
    }

    private void resolveTextMessage(Update update) {
        System.out.println("message");
    }

    private void resolveCommandMessage(Update update) {
        var arrayCommand = update.getMessage().getText().split(COMMAND_SPLIT_REGEX);
        var serviceCommand = ServiceCommand.fromValue(arrayCommand[0]);
        switch (serviceCommand) {
            case START -> {
                resolveStartCommandMessage(update);
            }
            case ACTIVATE -> {
                if (arrayCommand.length > 1) {
                    resolveActivateCommandMessage(update, arrayCommand[1]);
                } else {
                    sendMessageToBot("Wrong command, try again.", update.getMessage().getChatId());
                }
            }
            case HELP -> {
                resolveHelpCommandMessage(update);
            }
        }
    }

    private void resolveHelpCommandMessage(Update update) {
        var telegramUser = findOrSaveTelegramUser(update);
        var telegramChatId = telegramUser.getTelegramUserId();
        sendMessageToBot(DEFAULT_COMMANDS_LIST.toString(), telegramChatId);
    }

    private void resolveActivateCommandMessage(Update update, String email) {
        var telegramUser = findOrSaveTelegramUser(update);
        if (telegramUser.getStatus().equals(Status.ACTIVE)) {
            sendMessageToBot("Your account is already activated", telegramUser.getTelegramUserId());
            return;
        }
        var mailParams = MailParams.builder()
                .mailTo(encode(email))
                .id(encode(telegramUser.getId().toString()))
                .build();
        producerService.sendMessageToMailService(mailParams);
        sendMessageToBot("Check your email to active account.", telegramUser.getTelegramUserId());
    }

    private void resolveStartCommandMessage(Update update) {
        var telegramUser = findOrSaveTelegramUser(update);
        var message = telegramUser.getFirstName() + " " + telegramUser.getLastName() + GREETING_COMMAND;
        var telegramChatId = telegramUser.getTelegramUserId();
        sendMessageToBot(message, telegramChatId);
        sendMessageToBot(HELP_COMMAND.toString(), telegramChatId);
    }

    private User findOrSaveTelegramUser(Update update) {
        var telegramUser = update.getMessage().getFrom();
        return userService.findByTelegramBotUserId(telegramUser.getId())
                .orElseGet(() -> userService.save(
                        User.builder()
                                .firstName(telegramUser.getFirstName())
                                .lastName(telegramUser.getLastName())
                                .userName(telegramUser.getUserName())
                                .telegramUserId(telegramUser.getId())
                                .role(getDefaultRole())
                                .status(Status.NOT_ACTIVE)
                                .isTelegramUser(true)
                                .isWebUser(false)
                                .build()
                ));
    }

    private Role getDefaultRole() {
        return roleService.findByDefaultCode();
    }

    private void sendMessageToBot(String message, Long id) {
        var sendMessage = new SendMessage();
        sendMessage.setChatId(id);
        sendMessage.setText(message);
        producerService.sendMessageToBot(sendMessage);
    }

    private static List<Long> getListUserId(List<User> userList) {

        //todo add filter for user

        return userList.stream()
                .filter(user -> user.getStatus().equals(Status.ACTIVE))
                .map(User::getTelegramUserId)
                .toList();
    }

    private String encode(String string) {
        return new String(Base64.encodeBase64(string.getBytes()));
    }
}
