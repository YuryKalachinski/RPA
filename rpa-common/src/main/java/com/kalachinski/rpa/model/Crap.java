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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity(name = "Crap")
@Table(name = "crap", schema = "main")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class Crap extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "net_name", nullable = false, unique = true)
    private String netName;

    @ManyToOne
    @JoinColumn
    private Substation substation;

    @Column(name = "host", nullable = false, unique = true)
    private String host;

    @Column(name = "port", nullable = false)
    private Integer port;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_available")
    private boolean isAvailable;

    @Column(name = "last_success_check")
    private LocalDateTime lastSuccessCheck;

    @OneToMany(mappedBy = "crap", cascade = CascadeType.ALL)
    private List<ErrorConnection> errorConnections = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Crap crap = (Crap) o;
        return Objects.equals(name, crap.name) && Objects.equals(netName, crap.netName) && Objects.equals(substation, crap.substation) && Objects.equals(host, crap.host);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, netName, substation, host);
    }
}
