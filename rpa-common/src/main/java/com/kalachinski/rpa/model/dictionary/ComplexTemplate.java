package com.kalachinski.rpa.model.dictionary;

import com.kalachinski.rpa.model.BaseEntity;
import com.kalachinski.rpa.model.substation.Complex;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Entity(name = "ComplexTemplate")
@Table(name = "complex_template", schema = "main")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class ComplexTemplate extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "manufacturer")
    private String manufacturer;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Complex complex;
}
