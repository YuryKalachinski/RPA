package com.kalachinski.rpa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "ParameterSetting")
@Table(name = "parameter_setting", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class ParameterSetting extends BaseEntity {

    @Column(name = "key")
    private String key;

    @Column(name = "value")
    private String value;

    @Column(name = "unit")
    private String unit;

    @Column(name = "comment")
    private String comment;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "protection_id")
    private Protection protection;
}
