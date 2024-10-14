package vn.ths.SocialNetwork.dto.response.user;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RelationResponse {
    String id;
    User user;
    List<User> friends;
}
