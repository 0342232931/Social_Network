package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
}
