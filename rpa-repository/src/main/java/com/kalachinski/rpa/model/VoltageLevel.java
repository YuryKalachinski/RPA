package com.kalachinski.rpa.model;

public enum VoltageLevel {
    THREE_HUNDRED_THIRTY(330),
    TWO_HUNDRED_TWENTY(220),
    ONE_HUNDRED_TEN(110),
    THIRTY_FIVE(35),
    TEN(10),
    SIX(6);

    private final int value;

    VoltageLevel(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
