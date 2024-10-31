package vn.ths.SocialNetwork.services.implement.user;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.repository.user.AvatarRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.user.AvatarService;

import java.io.IOException;

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
    public void deleteByUserId(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        avatarRepository.deleteByUser(user);
    }
}
