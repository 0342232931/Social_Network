package vn.ths.SocialNetwork.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "invalid_token")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvalidatedToken {
    @Id
    String id = UUID.randomUUID().toString().substring(0, 20);

    @Column(name = "expiry_time")
    Date expiryTime;
}
