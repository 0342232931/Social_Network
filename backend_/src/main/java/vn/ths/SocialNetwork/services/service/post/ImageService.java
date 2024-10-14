package vn.ths.SocialNetwork.services.service.post;

import vn.ths.SocialNetwork.dto.request.post.ImageRequest;
import vn.ths.SocialNetwork.dto.response.post.ImageResponse;
import vn.ths.SocialNetwork.entity.post.Image;

import java.util.List;

public interface ImageService {
    public ImageResponse create(ImageRequest request);
    public ImageResponse findById(String id);
    public List<Image> getAll();
    public List<Image> getByPostId(String postId);
    public void deleteById(String id);
}
