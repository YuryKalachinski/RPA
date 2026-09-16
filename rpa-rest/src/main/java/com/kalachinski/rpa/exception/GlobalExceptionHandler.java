package com.kalachinski.rpa.exception;

import com.kalachinski.rpa.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleAllUncaughtExceptions(Exception ex) {
        log.error("Unhandled exception caught: ", ex);
        return new ErrorResponse(
                "INTERNAL_SERVER_ERROR",
                "Произошла непредвиденная ошибка на сервере. Пожалуйста, попробуйте позже.",
                LocalDateTime.now()
        );
    }
}
