package com.kalachinski.rpa.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Set;

@Entity(name = "Complex")
@Table(name = "complex", schema = "main")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class Complex extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "complex",
            cascade = CascadeType.ALL)
    private Set<Protection> protections;

    @ManyToOne
    @JoinColumn(name = "bay_id")
    private Bay bay;


    //todo is it necessary?
    public void addProtection(Protection protection) {
        protections.add(protection);
        protection.setComplex(this);
    }

    public void remoteProtection(Protection protection) {
        protections.remove(protection);
        protection.setComplex(null);
    }
}
