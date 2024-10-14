package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "permission")
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Permission {
    @Id
    @Column(name = "name")
    String name;

    @Column(name = "description")
    String description;

}
