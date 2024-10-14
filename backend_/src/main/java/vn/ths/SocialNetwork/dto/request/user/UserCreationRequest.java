package vn.ths.SocialNetwork.dto.request.user;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.Role;

import java.sql.Blob;
import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 5, message = "USERNAME_INVALID")
    String username;
    @Size(min = 5, message = "PASSWORD_INVALID")
    String password;
    String email;
}
