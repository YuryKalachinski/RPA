package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity(name = "Protection")
@Table(name = "protection", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class Protection extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "action")
    @Enumerated(value = EnumType.STRING)
    private ProtectionAction protectionAction;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "complex_id")
    private Complex complex;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "protection_trip", schema = "main",
            joinColumns = @JoinColumn(name = "protection_id"),
            inverseJoinColumns = @JoinColumn(name = "trip_id"))
    private Set<Trip> trips;

    @OneToMany(mappedBy = "protection", cascade = CascadeType.ALL)
    private Set<ParameterSetting> parameterSettings;
}
