package vn.ths.SocialNetwork.dto.response.user;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.ths.SocialNetwork.entity.user.Permission;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {
    String name;
    String description;
    Set<Permission> permissions;
}
