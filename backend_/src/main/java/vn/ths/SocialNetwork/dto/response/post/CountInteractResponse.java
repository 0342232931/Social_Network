package vn.ths.SocialNetwork.dto.response.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE)
@Setter
@Getter
@ToString
@Slf4j
@Builder
public class CountInteractResponse {
    int interactQuantity;
    int commentQuantity;
}
