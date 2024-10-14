package vn.ths.SocialNetwork.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.entity.post.Interaction;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction, String> {
    public boolean existsByInteractAndUserAndPost(Interact interact, User user, Post post);
}
