package com.kalachinski.rpa.model.dictionary;

import com.kalachinski.rpa.model.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Objects;

@Entity(name = "ParameterDictionary")
@Table(name = "parameter_dictionary", schema = "main")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class ParameterDictionary extends BaseEntity {

    @Column(name = "key", nullable = false, unique = true)
    private String key;

    @Column(name = "unit")
    private String unit;

    @Column(name = "description")
    private String description;

    @Column(name = "priority")
    private Byte priority;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ParameterDictionary that = (ParameterDictionary) o;
        return Objects.equals(key, that.key);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), key);
    }
}
