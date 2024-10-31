package vn.ths.SocialNetwork.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.entity.post.Post;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
    List<Image> getAllImageByPostId(String postId);
}
