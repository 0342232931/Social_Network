package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

    Date timestamp = new Date();

    boolean isSeen;

    @ManyToOne
    User userFrom;

    @ManyToOne
    User userTo;
}
