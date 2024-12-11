package vn.ths.SocialNetwork.services.service.post;

import vn.ths.SocialNetwork.dto.request.post.PostCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.PostUpdateRequest;
import vn.ths.SocialNetwork.dto.response.PageResponse;
import vn.ths.SocialNetwork.dto.response.post.CountInteractResponse;
import vn.ths.SocialNetwork.dto.response.post.PostResponse;
import vn.ths.SocialNetwork.entity.post.Post;

import java.util.List;

public interface PostService {
    public PostResponse create(PostCreationRequest request);
    public PostResponse findById(String id);
    public PostResponse updateById(String id, PostUpdateRequest request);
    public PostResponse getPostAdmin();
    public PageResponse<PostResponse> getFriendPosts(int page, int size, String userId);
    public CountInteractResponse CountInteract (String id);
    public List<Post> getAllNewPostForFriendsOfUserAuthenticated(String userId);
    public List<Post> getAll();
    public List<Post> getByUserId(String id);
    public void deleteById(String id);
}
