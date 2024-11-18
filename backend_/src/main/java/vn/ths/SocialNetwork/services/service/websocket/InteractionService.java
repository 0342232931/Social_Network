package vn.ths.SocialNetwork.services.service.post;

import vn.ths.SocialNetwork.dto.request.post.InteractionCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.InteractionUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.InteractionResponse;
import vn.ths.SocialNetwork.entity.post.Interaction;

import java.util.List;

public interface InteractionService {
    public InteractionResponse create(InteractionCreationRequest request);
    public InteractionResponse getById(String id);
    public InteractionResponse updateById(String id, InteractionUpdateRequest request);
    public List<Interaction> getAll();
    public void deleteById(String id);
}
