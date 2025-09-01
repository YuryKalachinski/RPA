package com.kalachinski.rpa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Entity(name = "ErrorConnection")
@Table(name = "error_connection", schema = "main")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class ErrorConnection extends BaseEntity {

    @ManyToOne()
    @JoinColumn(name = "crap_id")
    private Crap crap;

    @Column(name = "error_desc")
    private String errorDesc;

    @Column(name = "error_time")
    private LocalDateTime errorTime;
}
