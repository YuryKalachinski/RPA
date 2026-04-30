package com.kalachinski.rpa.model.substation;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Objects;

public enum VoltageLevel {
    THREE_HUNDRED_THIRTY("330 кВ"),
    TWO_HUNDRED_TWENTY("220 кВ"),
    ONE_HUNDRED_TEN("110 кВ"),
    THIRTY_FIVE("35 кВ"),
    TEN("10 кВ"),
    SIX("6 кВ"),
    ZERO_FOUR("0,4 кВ");

    private final String value;

    VoltageLevel(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static VoltageLevel fromValue(String value) {
        for (VoltageLevel voltageLevel : VoltageLevel.values()) {
            if (Objects.equals(voltageLevel.value, value)) {
                return voltageLevel;
            }
        }
        throw new IllegalArgumentException("Неизвестное поле: " + value);
    }
}
