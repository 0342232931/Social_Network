package vn.ths.SocialNetwork.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    public List<Post> findPostByUser(User user);
    public List<Post> findPostByUserId(String userId);
}
