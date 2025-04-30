package com.kalachinski.rpa.service.enums;

public enum ViewCommand {
    DEFAULT_COMMANDS_LIST("""
            List of available commands:
            /start -
            /activate -
            /help -
            """),
    HELP_COMMAND("Enter /help to see default commands list."),
    GREETING_COMMAND(", welcome to the RPA bot!"),
    ;

    private final String value;

    ViewCommand(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
