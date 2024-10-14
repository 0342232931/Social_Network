package vn.ths.SocialNetwork.services.service.user;

import vn.ths.SocialNetwork.dto.request.user.AvatarCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AvatarUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;

public interface AvatarService {
    public AvatarResponse create(AvatarCreationRequest request);
    public AvatarResponse updateByUserId(String userId, AvatarUpdateRequest request);
    public AvatarResponse getByUserId(String userId);
    public void deleteByUserId(String userId);
}
