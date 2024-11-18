package vn.ths.SocialNetwork.entity.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.cglib.core.Local;
import vn.ths.SocialNetwork.entity.user.User;

import java.time.LocalDateTime;
import java.util.Date;
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

    @ManyToOne
    User sender;

    @ManyToOne
    User receiver;
}
