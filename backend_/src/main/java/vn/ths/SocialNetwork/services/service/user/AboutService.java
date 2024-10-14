package vn.ths.SocialNetwork.services.service.user;

import vn.ths.SocialNetwork.dto.request.user.AboutCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AboutUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AboutResponse;
import vn.ths.SocialNetwork.entity.user.About;

import java.util.List;

public interface AboutService {
    public AboutResponse create(AboutCreationRequest request);
    public AboutResponse updateById(String id, AboutUpdateRequest request);
    public AboutResponse getById(String id);
    public List<About> getALl();
    public AboutResponse getByUserId(String userId);
    public void delete(String id);
}
