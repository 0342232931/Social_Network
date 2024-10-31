package vn.ths.SocialNetwork.entity.post;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "interact")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Interact {
    @Id
    final String id = UUID.randomUUID().toString().substring(0, 20);

    @Column(name = "interact_type")
    String interactType;

}
