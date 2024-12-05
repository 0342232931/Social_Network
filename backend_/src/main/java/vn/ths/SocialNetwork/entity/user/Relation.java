package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "relation")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Relation {

    @Id
    String id = UUID.randomUUID().toString().substring(0,20);

    @OneToOne
    User user;

    @ManyToMany(fetch = FetchType.EAGER)
    List<User> friends;

}
