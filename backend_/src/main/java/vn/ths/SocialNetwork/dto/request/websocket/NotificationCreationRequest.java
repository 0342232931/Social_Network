package vn.ths.SocialNetwork.dto.request.websocket;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationCreationRequest {
    String message;
    String senderUsername;
    String receiverUsername;
}
