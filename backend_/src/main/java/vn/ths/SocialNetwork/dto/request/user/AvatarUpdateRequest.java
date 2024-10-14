package vn.ths.SocialNetwork.dto.request.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Blob;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AvatarUpdateRequest {
    Blob avatar;
}
