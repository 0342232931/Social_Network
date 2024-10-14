package vn.ths.SocialNetwork.dto.request.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleCreationRequest {
    String name;
    String description;
    Set<String> permissions;
}
