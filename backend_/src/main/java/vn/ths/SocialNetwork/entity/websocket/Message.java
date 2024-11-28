package vn.ths.SocialNetwork.entity.websocket;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    User receiver;
}
