package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.About;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.Optional;

@Repository
public interface AboutRepository extends JpaRepository<About, String> {
   Optional<About> getByUser(User user);
}
