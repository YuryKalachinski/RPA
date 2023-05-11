package com.kalachinski.rpa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity(name = "Bay")
@Table(name = "bay", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class Bay extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "cell_number")
    private Byte cellNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "substation_id")
    private Substation substation;

    public Bay(Long id, String name, String description, Substation substation) {
        super(id);
        this.name = name;
        this.description = description;
        this.substation = substation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Bay bay = (Bay) o;
        return Objects.equals(name, bay.name) && Objects.equals(substation, bay.substation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, substation);
    }
}
