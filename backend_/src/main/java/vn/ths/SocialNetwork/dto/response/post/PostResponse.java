package vn.ths.SocialNetwork.dto.response.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Comment;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.entity.post.Interaction;
import vn.ths.SocialNetwork.entity.user.User;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    String id;
    String content;
    LocalDate createAt;
    LocalDate updateAt;
    User user;
}
