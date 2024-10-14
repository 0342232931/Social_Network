package vn.ths.SocialNetwork.services.service.post;

import vn.ths.SocialNetwork.dto.request.post.InteractRequest;
import vn.ths.SocialNetwork.dto.response.post.InteractResponse;
import vn.ths.SocialNetwork.entity.post.Interact;

import java.util.List;

public interface InteractService {
    public InteractResponse create(InteractRequest request);
    public InteractResponse findById(String id);
    public List<Interact> getAll();
    public void deleteById(String id);
}
