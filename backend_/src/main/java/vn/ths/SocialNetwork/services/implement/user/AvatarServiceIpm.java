package vn.ths.SocialNetwork.services.implement.user;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.user.AvatarCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AvatarUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.AvatarMapper;
import vn.ths.SocialNetwork.repository.user.AvatarRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.user.AvatarService;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AvatarServiceIpm implements AvatarService {

    UserRepository userRepository;
    AvatarRepository avatarRepository;
    AvatarMapper avatarMapper;

    @Transactional
    @Override
    public AvatarResponse create(AvatarCreationRequest request) {

        Avatar avatar = avatarMapper.toAvatar(request);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        avatar.setUser(user);

        return avatarMapper.toAvatarResponse(avatarRepository.saveAndFlush(avatar));
    }

    @Transactional
    @Override
    public AvatarResponse updateByUserId(String userId, AvatarUpdateRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Avatar avatar = avatarRepository.getByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));

        return avatarMapper.toAvatarResponse(avatarRepository.saveAndFlush(avatar));
    }

    @Override
    public AvatarResponse getByUserId(String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Avatar avatar = avatarRepository.getByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));

        return avatarMapper.toAvatarResponse(avatar);
    }

    @Transactional
    @Override
    public void deleteByUserId(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        avatarRepository.deleteByUser(user);
    }
}
