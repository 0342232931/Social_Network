package vn.ths.SocialNetwork.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Interact;

@Repository
public interface InteractRepository extends JpaRepository<Interact, String> {
    public boolean existsByInteractType(String interactType);
}
