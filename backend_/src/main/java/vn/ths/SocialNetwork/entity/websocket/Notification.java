package vn.ths.SocialNetwork.entity.websocket;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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

    String id = UUID.randomUUID().toString();

    LocalDateTime createAt = LocalDateTime.now();

    String content;

    @ManyToOne
    User sender;

    @ManyToOne
    User receiver;
}
