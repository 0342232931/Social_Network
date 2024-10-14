package vn.ths.SocialNetwork.dto.request.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreationRequest {
    String content;
    String userId;
}
