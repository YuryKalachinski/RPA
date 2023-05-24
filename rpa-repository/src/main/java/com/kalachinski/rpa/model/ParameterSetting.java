package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "protection_id")
    private Protection protection;
}
