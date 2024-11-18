package vn.ths.SocialNetwork.services.service.websocket;

import vn.ths.SocialNetwork.dto.request.websocket.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.websocket.CommentResponse;
import vn.ths.SocialNetwork.entity.websocket.Comment;

import java.util.List;

public interface CommentService {
    public CommentResponse create(CommentCreationRequest request);
    public CommentResponse getById(String id);
    public CommentResponse updateById(String id, CommentUpdateRequest request);
    public List<Comment> getAll();
    public List<Comment> getByPostId(String postId);
    public void deleteById(String id);
}
