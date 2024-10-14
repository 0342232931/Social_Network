package vn.ths.SocialNetwork.dto.response.authentication;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    boolean isAuthenticated;
    UserResponse userResponse;
}
