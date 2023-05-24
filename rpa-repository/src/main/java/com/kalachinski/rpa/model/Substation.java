package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;

@Entity(name = "Substation")
@Table(name = "substation", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class Substation extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "substation", cascade = CascadeType.ALL)
    private Set<Bay> bays;

    public void addBay(Bay bay) {
        bays.add(bay);
        bay.setSubstation(this);
    }

    public void removeBay(Bay bay) {
        bays.remove(bay);
        bay.setSubstation(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Substation that = (Substation) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }
}
