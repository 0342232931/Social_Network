package vn.ths.SocialNetwork.dto.response.websocket;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationDeleteResponse {
    String id;
    String content;
    LocalDateTime createAt;
    UserResponse sender;
    UserResponse receiver;
    String type;
    String avatarUrl;
}
