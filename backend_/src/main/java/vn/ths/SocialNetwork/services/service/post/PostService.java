package vn.ths.SocialNetwork.services.service.post;

import vn.ths.SocialNetwork.dto.request.post.PostCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.PostUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.PostResponse;
import vn.ths.SocialNetwork.entity.post.Post;

import java.util.List;

public interface PostService {
    public PostResponse create(PostCreationRequest request);
    public PostResponse findById(String id);
    public PostResponse updateById(String id, PostUpdateRequest request);
    public List<Post> getAllNewPostForFriendsOfUserAuthenticated(String userId);
    public List<Post> getAll();
    public List<Post> getByUserId(String id);
    public void deleteById(String id);
}
