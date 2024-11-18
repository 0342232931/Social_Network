package vn.ths.SocialNetwork.dto.request.post;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentUpdateRequest {
    String content;
}
