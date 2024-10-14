package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Blob;
import java.util.UUID;

@Entity
@Table(name = "avatar")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Avatar {
    @Id
    final String id = UUID.randomUUID().toString().substring(0, 20);

    @Column(name = "photo")
    @Lob
    Blob photo;

    @OneToOne()
    User user;
}
