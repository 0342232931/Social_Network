package vn.ths.SocialNetwork.dto.response.chat;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.chat.Status;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    String id;
    String content;
    Status status;
    LocalDateTime createAt;
    String senderUsername;
    String receiverUsername;
}
