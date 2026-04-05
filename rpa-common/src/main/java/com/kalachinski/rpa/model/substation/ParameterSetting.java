package com.kalachinski.rpa.model.substation;

import com.kalachinski.rpa.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity(name = "ParameterSetting")
@Table(name = "parameter_setting", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class ParameterSetting extends BaseEntity {

    @Column(name = "key")
    private String key;

    @Column(name = "value")
    private String value;

    @Column(name = "unit")
    private String unit;

    @Column(name = "comment")
    private String comment;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "protection_id")
    private Protection protection;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ParameterSetting that = (ParameterSetting) o;
        return Objects.equals(key, that.key) && Objects.equals(protection, that.protection);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), key, protection);
    }
}
