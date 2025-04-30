package com.kalachinski.rpa.controller;

import com.kalachinski.rpa.service.UpdateDispatcher;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.api.objects.Update;

@RequiredArgsConstructor
@RequestMapping("/")
@RestController
public class WebHookController {

    private final UpdateDispatcher updateDispatcher;

    @PostMapping("/callback/update")
    public ResponseEntity<?> onUpdateReceive(@RequestBody Update update) {
        updateDispatcher.distribute(update);
        return ResponseEntity.ok().build();
    }
}
