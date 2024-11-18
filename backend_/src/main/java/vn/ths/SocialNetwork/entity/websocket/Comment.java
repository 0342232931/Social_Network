package vn.ths.SocialNetwork.entity.websocket;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "comment")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Comment {
    @Id
    final String id = UUID.randomUUID().toString().substring(0,20);

    @Column(name = "content")
    String content;

    @Column(name = "create_at")
    LocalDate createAt;

    @Column(name = "update_at")
    LocalDate updateAt;

    @ManyToOne()
    Post post;

    @ManyToOne()
    User user;
}
