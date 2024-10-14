package vn.ths.SocialNetwork.dto.response.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InteractionResponse {
    String id;
    User user;
    Interact interact;
    Post post;
}
