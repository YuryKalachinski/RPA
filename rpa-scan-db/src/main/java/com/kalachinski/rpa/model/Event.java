package com.kalachinski.rpa.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;

@Entity(name = "Event")
@Table(name = "event", schema = "main")
@Getter
@Setter
@EqualsAndHashCode(of = {"name"})
@ToString(of = {"id", "name"})
@NoArgsConstructor
@Accessors(chain = true)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;
}
