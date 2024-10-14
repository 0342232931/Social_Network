package vn.ths.SocialNetwork.dto.response.user;


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
public class UserResponse {
    String id;
    String username;
    String email;
    String firstName;
    String lastName;
    Date dob;
    String address;
    String education;
    String job;
    Set<Role> roles;
}
