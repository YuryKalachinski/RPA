package com.kalachinski.rpa.model;

public enum VoltageLevel {
    THREE_HUNDRED_THIRTY("330 kV"),
    TWO_HUNDRED_TWENTY("220 kV"),
    ONE_HUNDRED_TEN("110 kV"),
    THIRTY_FIVE("35 kV"),
    TEN("10 kV"),
    SIX("6 kV");

    private final String value;

    VoltageLevel(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
