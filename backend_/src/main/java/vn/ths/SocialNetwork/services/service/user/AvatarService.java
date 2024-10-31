package vn.ths.SocialNetwork.services.service.user;

import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;

import java.io.IOException;

public interface AvatarService {
    public Avatar save(String userId,MultipartFile file) throws IOException;
    public void deleteByUserId(String userId);
    public AvatarResponse getByUserId(String userId);
}
