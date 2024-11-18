package vn.ths.SocialNetwork.services.service.post;

import vn.ths.SocialNetwork.dto.request.post.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.CommentResponse;
import vn.ths.SocialNetwork.entity.post.Comment;

import java.util.List;

public interface CommentService {
    public CommentResponse create(CommentCreationRequest request);
    public CommentResponse getById(String id);
    public CommentResponse updateById(String id, CommentUpdateRequest request);
    public List<Comment> getAll();
    public List<Comment> getByPostId(String postId);
    public void deleteById(String id);
}
