package vn.ths.SocialNetwork.repository.websocket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.websocket.Comment;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    @Query("SELECT c FROM Comment c WHERE c.post.id = :postId ORDER BY c.createAt ASC")
    List<Comment> getByPostId(@Param("postId") String postId);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post.id = :postId")
    int countCommentInPostByPostId(@Param("postId") String postId);
}
