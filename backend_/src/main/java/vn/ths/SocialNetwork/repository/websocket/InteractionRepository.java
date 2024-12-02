package vn.ths.SocialNetwork.repository.websocket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.entity.websocket.Interaction;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction, String> {
    public boolean existsByInteractAndUserAndPost(Interact interact, User user, Post post);

    @Query("SELECT COUNT(i) FROM Interaction i WHERE i.post.id = :postId")
    int countInteractionInPostByPostId(@Param("postId") String postId);
}
