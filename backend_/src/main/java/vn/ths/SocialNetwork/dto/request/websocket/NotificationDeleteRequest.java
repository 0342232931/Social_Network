package vn.ths.SocialNetwork.dto.request.websocket;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationDeleteRequest {
    String userId;
    String notificationId;
    String isAddFriend;
}
