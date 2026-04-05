package com.kalachinski.rpa.model.substation;

import com.kalachinski.rpa.model.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Protection")
@Table(name = "protection", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class Protection extends BaseEntity {

    @Column(name = "is_root")
    private boolean isRoot;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "action")
    @Enumerated(value = EnumType.STRING)
    private ProtAction protAction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Protection parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complex_id")
    private Complex complex;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "protection_trip", schema = "main",
            joinColumns = @JoinColumn(name = "protection_id"),
            inverseJoinColumns = @JoinColumn(name = "trip_id"))
    private Set<Trip> trips = new HashSet<>();

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Protection> children = new HashSet<>();

    @OneToMany(mappedBy = "protection", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParameterSetting> parameterSettings = new HashSet<>();

    //todo is it necessary?

    public void addChild(Protection child) {
        children.add(child);
        child.setParent(this);
    }

    public void removeChild(Protection child) {
        children.remove(child);
        child.setParent(null);
    }

    public void addChild(ParameterSetting parameterSetting) {
        parameterSettings.add(parameterSetting);
        parameterSetting.setProtection(this);
    }

    public void removeChild(ParameterSetting parameterSetting) {
        parameterSettings.remove(parameterSetting);
        parameterSetting.setProtection(null);
    }


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Protection that = (Protection) o;
        return isRoot == that.isRoot && Objects.equals(name, that.name) && Objects.equals(parent, that.parent) && Objects.equals(complex, that.complex);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), isRoot, name, parent, complex);
    }
}


