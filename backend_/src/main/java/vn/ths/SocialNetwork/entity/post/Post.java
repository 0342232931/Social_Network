package vn.ths.SocialNetwork.entity.post;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.User;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "post")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @Id
    final String id = UUID.randomUUID().toString().substring(0,20);

    @Column(name = "content")
    String content;

    @Column(name = "create_at")
    LocalDate createAt;

    @Column(name = "update_at")
    LocalDate updateAt;

    @ManyToOne()
    User user;
}
