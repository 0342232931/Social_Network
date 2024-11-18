package vn.ths.SocialNetwork.entity.websocket;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.UUID;

@Entity
@Table(name = "interaction")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Interaction {
    @Id
    final String id = UUID.randomUUID().toString().substring(0,20);

    @ManyToOne()
    User user;

    @ManyToOne()
    Interact interact;

    @ManyToOne()
    Post post;
}
