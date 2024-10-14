package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {

}
