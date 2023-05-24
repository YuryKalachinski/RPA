package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;

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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "substation_id")
    private Substation substation;

    @Column(name = "voltage_level")
    @Enumerated(value = EnumType.STRING)
    private VoltageLevel voltageLevel;

    @JsonIgnore
    @OneToMany(mappedBy = "bay", cascade = CascadeType.ALL)
    private Set<Trip> trips;

    @OneToMany(mappedBy = "bay", cascade = CascadeType.ALL)
    private Set<Complex> complexes;

//    public void addTrip(Trip trip) {
//        trips.add(trip);
//        trip.setBay(this);
//    }

//    public void removeTrip(Trip trip) {
//        trips.remove(trip);
//        trip.setBay(null);
//    }

//    public void addComplex(Complex complex) {
//        complexes.add(complex);
//        complex.setBay(this);
//    }

//    public void removeComplex(Complex complex) {
//        complexes.remove(complex);
//        complex.setBay(null);
//    }

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
