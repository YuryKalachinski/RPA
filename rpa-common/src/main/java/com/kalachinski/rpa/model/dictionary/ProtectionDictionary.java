package com.kalachinski.rpa.model.dictionary;

import com.kalachinski.rpa.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Objects;

@Entity(name = "ProtectionDictionary")
@Table(name = "protection_dictionary", schema = "main")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class ProtectionDictionary extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "priority", nullable = false)
    private Byte priority;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ProtectionDictionary that = (ProtectionDictionary) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }
}
