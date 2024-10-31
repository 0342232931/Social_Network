package vn.ths.SocialNetwork.services.implement.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.repository.post.ImageRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.services.service.post.ImageService;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageServiceIpm implements ImageService {

    PostRepository postRepository;
    ImageRepository imageRepository;

    @Override
    public Image create(String postId, MultipartFile file) throws IOException {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        return imageRepository.saveAndFlush(Image.builder()
                        .fileName(file.getOriginalFilename())
                        .fileType(file.getContentType())
                        .data(file.getBytes())
                        .post(post)
                        .build());
    }

    @Override
    public void deleteById(String id) {

        imageRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_EXISTED));

        imageRepository.deleteById(id);
    }
}
