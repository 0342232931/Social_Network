package vn.ths.SocialNetwork.services.service.post;

import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.dto.request.post.ImageRequest;
import vn.ths.SocialNetwork.dto.response.post.ImageResponse;
import vn.ths.SocialNetwork.entity.post.Image;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    public Image create(String postId, MultipartFile file) throws IOException;
    public void deleteById(String id);
}
