package vn.ths.SocialNetwork.services.implement.user;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.user.AboutCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AboutUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AboutResponse;
import vn.ths.SocialNetwork.entity.user.About;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.AboutMapper;
import vn.ths.SocialNetwork.repository.user.AboutRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.user.AboutService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AboutServiceIpm implements AboutService {

    UserRepository userRepository;
    AboutRepository aboutRepository;
    AboutMapper aboutMapper;

    @Transactional
    @Override
    public AboutResponse create(AboutCreationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        About about = aboutMapper.toAbout(request);

        about.setUser(user);

        return aboutMapper.toAboutResponse(aboutRepository.saveAndFlush(about));
    }

    @Transactional
    @Override
    public AboutResponse updateById(String id, AboutUpdateRequest request) {

        About about = aboutRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ABOUT_NOT_EXISTED));
        aboutMapper.updateAbout(about, request);

        return aboutMapper.toAboutResponse(aboutRepository.saveAndFlush(about));
    }

    @Override
    public AboutResponse getById(String id) {

        About about = aboutRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ABOUT_NOT_EXISTED));

        return aboutMapper.toAboutResponse(about);
    }

    @Override
    public List<About> getALl() {
        return aboutRepository.findAll();
    }

    @Override
    public AboutResponse getByUserId(String userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        About about = aboutRepository.getByUser(user).orElseThrow(() -> new AppException(ErrorCode.ABOUT_NOT_EXISTED));

        return aboutMapper.toAboutResponse(about);
    }

    @Override
    public void delete(String id) {

        aboutRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ABOUT_NOT_EXISTED));

        aboutRepository.deleteById(id);

    }
}
