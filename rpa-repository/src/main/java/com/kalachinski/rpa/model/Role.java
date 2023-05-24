package com.kalachinski.rpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
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

    @JsonIgnore
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<User> users = new HashSet<>();

//    public void addUser(User user) {
//        users.add(user);
//        user.setRole(this);
//    }
//
//    public void removeUser(User user) {
//        users.remove(user);
//        user.setRole(null);
//    }

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
