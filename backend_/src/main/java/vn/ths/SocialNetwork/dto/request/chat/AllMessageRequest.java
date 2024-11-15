package vn.ths.SocialNetwork.dto.request.chat;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllMessageRequest {
    String senderUsername;
    String receiverUsername;
}
