package vn.ths.SocialNetwork.dto.response.websocket;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllMessageResponse {
    String groupName;
    List<MessageResponse> messages;
}
