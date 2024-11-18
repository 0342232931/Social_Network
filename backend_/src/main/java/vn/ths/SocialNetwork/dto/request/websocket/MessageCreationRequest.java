package vn.ths.SocialNetwork.dto.request.chat;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.chat.Status;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class MessageCreationRequest {
    String content;
    Status status;
    String senderUsername;
    String receiverUsername;
}
