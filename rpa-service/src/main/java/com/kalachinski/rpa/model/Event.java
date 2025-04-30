package com.kalachinski.rpa.model;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@EqualsAndHashCode(of = {"name"})
@ToString(of = {"id", "name"})
@NoArgsConstructor
@Accessors(chain = true)
public class Event {

    //todo temporarily model, exchange for real data model

    private Long id;

    private String name;
}
