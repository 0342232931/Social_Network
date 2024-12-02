package vn.ths.SocialNetwork.services.service.websocket;

import vn.ths.SocialNetwork.dto.request.websocket.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.websocket.CommentResponse;
import vn.ths.SocialNetwork.entity.websocket.Comment;

import java.util.List;

public interface CommentService {
    public CommentResponse create(CommentCreationRequest request);
    public List<CommentResponse> getByPostId(String postId);
    public void deleteById(String id);
}
