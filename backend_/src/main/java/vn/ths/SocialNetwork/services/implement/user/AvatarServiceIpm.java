package vn.ths.SocialNetwork.services.implement.user;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.repository.user.AvatarRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.user.AvatarService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AvatarServiceIpm implements AvatarService {

    UserRepository userRepository;
    AvatarRepository avatarRepository;

    @Transactional
    @Override
    public Avatar save( String userId, MultipartFile file) throws IOException {
        Avatar avatar = new Avatar();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        avatar.setUser(user);
        avatar.setFileName(file.getOriginalFilename());
        avatar.setFileType(file.getContentType());
        avatar.setData(file.getBytes());

        return avatarRepository.saveAndFlush(avatar);
    }

    @Transactional
    @Override
    public void deleteById(String id) {
        avatarRepository.deleteById(id);
    }

    @Override
    public AvatarResponse getByUserId(String userId) {
        Avatar avatar = avatarRepository.getByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));

        String dataEncode = Base64.getEncoder().encodeToString(avatar.getData());

        return AvatarResponse.builder()
                .id(avatar.getId())
                .fileName(avatar.getFileName())
                .fileType(avatar.getFileType())
                .data(dataEncode)
                .user(avatar.getUser())
                .build();
    }

    @Override
    public List<AvatarResponse> getAllByUserId(String userId) {
        List<Avatar> avatars = avatarRepository.getAvatarsByUserId(userId);

        if (avatars.isEmpty())
            return null;

        List<AvatarResponse> responses = new ArrayList<>();

        for (Avatar avatar : avatars){
            String dataEncode = Base64.getEncoder().encodeToString(avatar.getData());
            responses.add(AvatarResponse.builder()
                            .user(avatar.getUser())
                            .id(avatar.getId())
                            .fileName(avatar.getFileName())
                            .fileType(avatar.getFileType())
                            .data(dataEncode)
                            .build());
        }
        return responses;
    }
}
