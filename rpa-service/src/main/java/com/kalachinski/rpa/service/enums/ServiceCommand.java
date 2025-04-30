package com.kalachinski.rpa.service.enums;

public enum ServiceCommand {
    HELP("/help"),
    START("/start"),
    ACTIVATE("/activate"),
    CANCEL("/cancel"),
    NOTHING(""),
    ;

    private final String value;

    ServiceCommand(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }

    public static ServiceCommand fromValue(String value) {
        for (ServiceCommand command : ServiceCommand.values()) {
            if (command.value.equals(value)) {
                return command;
            }
        }
        return NOTHING;
    }
}
