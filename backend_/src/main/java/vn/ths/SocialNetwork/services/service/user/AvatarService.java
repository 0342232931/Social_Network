package vn.ths.SocialNetwork.services.service.user;

import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;

import java.io.IOException;
import java.util.List;

public interface AvatarService {
    public Avatar save(String userId,MultipartFile file) throws IOException;
    public void deleteById(String id);
    public AvatarResponse getByUserId(String userId);
    public List<AvatarResponse> getAllByUserId(String userId);
}
