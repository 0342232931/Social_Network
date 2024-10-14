package vn.ths.SocialNetwork.entity.post;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Blob;
import java.util.UUID;

@Entity
@Table(name = "image")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Image {
    @Id
    final String id = UUID.randomUUID().toString().substring(0,20);

    @Column(name = "image")
    @Lob
    Blob image;

    @ManyToOne()
    Post post;
}
