package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, String> {

    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);
    public Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.firstName LIKE %:keyword%" +
            " or u.lastName LIKE %:keyword%")
    public List<User> searchUserByKeyword(@Param("keyword") String keyword);

}
