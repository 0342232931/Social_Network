package vn.ths.SocialNetwork.dto.response.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.post.Post;

import java.sql.Blob;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageResponse {
    String id;
    Blob image;
    Post post;
}
