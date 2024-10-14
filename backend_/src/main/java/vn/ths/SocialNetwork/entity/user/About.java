package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "about")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class About {
    @Id
    final String id = UUID.randomUUID().toString().substring(0,20);

    @Column(name = "description")
    String description;

    @OneToOne()
    User user;
}
