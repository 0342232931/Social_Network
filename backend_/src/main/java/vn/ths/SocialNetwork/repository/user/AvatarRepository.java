package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, String> {
    public Optional<Avatar> getByUserId(String userId);
    public List<Avatar> getAvatarsByUserId(String userId);
}
