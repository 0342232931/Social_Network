package vn.ths.SocialNetwork.dto.request.user;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AboutUpdateRequest {
    String description;
}
