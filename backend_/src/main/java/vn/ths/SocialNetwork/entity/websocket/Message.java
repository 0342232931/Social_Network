package vn.ths.SocialNetwork.entity.websocket;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.User;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "message")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {
    @Id
    String id = UUID.randomUUID().toString();

    String content;

    LocalDateTime createAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    User receiver;
}
