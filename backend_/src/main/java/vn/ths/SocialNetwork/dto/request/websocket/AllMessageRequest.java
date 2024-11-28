package vn.ths.SocialNetwork.dto.request.websocket;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllMessageRequest {
    String senderUsername;
    String receiverUsername;
}
