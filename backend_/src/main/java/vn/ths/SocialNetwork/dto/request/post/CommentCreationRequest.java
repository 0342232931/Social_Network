package vn.ths.SocialNetwork.dto.request.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentCreationRequest {
    String content;
    String userId;
    String postId;
}
