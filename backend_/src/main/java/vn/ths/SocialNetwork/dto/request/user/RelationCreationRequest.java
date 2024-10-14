package vn.ths.SocialNetwork.dto.request.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RelationCreationRequest {
    String userId;
    List<String> friendIds;
}
