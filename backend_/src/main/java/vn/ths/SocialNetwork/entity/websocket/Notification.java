package vn.ths.SocialNetwork.entity.websocket;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.User;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notification")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {

    @Id
    @Column(name = "id")
    String id = UUID.randomUUID().toString();

    @Column(name = "create_at")
    LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "content")
    String content;

    @Column(name = "type")
    String type;

    @ManyToOne
    User sender;

    @ManyToOne
    User receiver;
}
