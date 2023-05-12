package com.kalachinski.rpa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Role")
@Table(name = "role", schema = "main")
@Getter
@Setter
@NoArgsConstructor
public class Role extends BaseEntity {

    @Column(name = "title")
    private String title;

    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "role")
    private Set<User> user = new HashSet<>();

    public Role(Long id, String title, String code) {
        super(id);
        this.title = title;
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Role role = (Role) o;
        return Objects.equals(title, role.title) && Objects.equals(code, role.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), title, code);
    }
}
