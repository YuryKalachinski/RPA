package com.kalachinski.rpa.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Accessors(chain = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", schema = "main")
@Entity(name = "User")
public class User extends BaseEntity{

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email", unique = true)
    private String email;

    @CreationTimestamp
    @Column(name = "first_login_date")
    private LocalDateTime firstLoginDate;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "telegram_user_id", unique = true)
    private Long telegramUserId;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "is_telegram_user")
    private Boolean isTelegramUser;

    @Column(name = "is_web_user")
    private Boolean isWebUser;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Token> tokens;

    //todo unused method
    public void addToken(Token token) {
        tokens.add(token);
        token.setUser(this);
    }

    //todo redefine equals and hashCode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(firstName, user.firstName)
                && Objects.equals(lastName, user.lastName)
                && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, email);
    }

    //todo only for testing

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", firstLoginDate=" + firstLoginDate +
                ", userName='" + userName + '\'' +
                ", telegramUserId=" + telegramUserId +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", status=" + status +
                ", isTelegramUser=" + isTelegramUser +
                ", isWebUser=" + isWebUser +
                '}';
    }
}
