package vn.ths.SocialNetwork.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Comment;
import vn.ths.SocialNetwork.entity.post.Post;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> getByPost(Post post);
}
