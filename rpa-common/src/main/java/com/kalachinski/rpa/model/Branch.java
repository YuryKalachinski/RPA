package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Objects;

public enum Branch {
    BES("БЭС"),
    BTEC2("БТЭЦ-2"),
    BTS("БТС"),
    KES("КЭС"),
    MES("МЭС"),
    MTEC2("МТЭЦ-2"),
    MTS("МТС");

    private final String field;
    Branch(String field) {
        this.field = field;
    }

    @JsonValue
    public String getField() {
        return field;
    }

    @JsonCreator
    public static Branch fromField(String field) {
        for (Branch branch : Branch.values()) {
            if (Objects.equals(branch.field, field)) {
                return branch;
            }
        }
        throw new IllegalArgumentException("Неизвестный поле: " + field);
    }
}
