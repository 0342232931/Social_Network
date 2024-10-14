package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);
    public Optional<User> findByUsername(String username);
}
