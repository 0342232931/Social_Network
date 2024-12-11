package vn.ths.SocialNetwork.repository.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;

import java.awt.print.Pageable;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface PostRepository extends JpaRepository<Post, String> {
    public List<Post> findPostByUser(User user);
    public List<Post> findPostByUserId(String userId);

    @Query("SELECT p.id FROM Post p WHERE p.user.id = :userId")
    public List<String> findAllPostIdByUserId(@Param("userId") String userId);

    @Query("SELECT p FROM Post p WHERE p.id IN :ids")
    public Page<Post> findAllPostById(@Param("ids") List<String> ids, PageRequest pageRequest);
}
