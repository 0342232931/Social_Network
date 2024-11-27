package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    final String id = UUID.randomUUID().toString().substring(0, 20);

    @Column(name = "email", unique = true)
    String email;

    @Column(name = "username", unique = true)
    String username;

    @Column(name = "password")
    String password;

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "dob")
    Date dob;

    @Column(name = "address")
    String address;

    @Column(name = "hometown")
    String hometown;

    @Column(name = "university")
    String university;

    @Column(name = "high_school")
    String highSchool;

    @Column(name = "phone_number")
    String phoneNumber;

    @Column(name = "job")
    String job;

    @ManyToMany(fetch = FetchType.EAGER)
    Set<Role> roles;

}
