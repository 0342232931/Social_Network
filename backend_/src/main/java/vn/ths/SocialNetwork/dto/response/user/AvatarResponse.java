package vn.ths.SocialNetwork.dto.response.user;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.User;

import java.sql.Blob;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AvatarResponse {
    String id;
    Blob avatar;
    User user;
}
