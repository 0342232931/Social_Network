package vn.ths.SocialNetwork.dto.response.websocket;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class MessageResponse {
    String id;
    String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createAt;
    UserResponse sender;
    UserResponse receiver;
}
