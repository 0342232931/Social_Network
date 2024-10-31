package vn.ths.SocialNetwork.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    byte[] data;

    @Column(name = "file_name")
    String fileName;

    @Column(name = "file_type")
    String fileType;

    @ManyToOne()
    User user;
}
