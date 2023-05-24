package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Trip")
@Table(name = "trip", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class Trip extends BaseEntity {

    @Column(name = "tripTime", nullable = false)
    private LocalDateTime tripTime;

    @Column(name = "closeTime")
    private LocalDateTime closeTime;

    @Column(name = "distance")
    private Float distance;

    @ElementCollection
    @CollectionTable(name = "type_fault", schema = "main",
            joinColumns = @JoinColumn(name = "trip_id"))
    @Enumerated(value = EnumType.STRING)
    @Column(name = "typeFault")
    private Set<TypeFault> typesFault;

    @ManyToOne()
    @JoinColumn(name = "bay_id")
    private Bay bay;

    @ManyToMany(mappedBy = "trips")
    private Set<Protection> protections;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Trip trip = (Trip) o;
        return Objects.equals(tripTime, trip.tripTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), tripTime);
    }
}
