package vn.ths.SocialNetwork.services.implement.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.post.ImageRequest;
import vn.ths.SocialNetwork.dto.response.post.ImageResponse;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.post.ImageMapper;
import vn.ths.SocialNetwork.repository.post.ImageRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.services.service.post.ImageService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageServiceIpm implements ImageService {

    PostRepository postRepository;
    ImageRepository imageRepository;
    ImageMapper imageMapper;

    @Override
    public ImageResponse create(ImageRequest request) {

        Image image = imageMapper.toImage(request);

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        image.setPost(post);

        return imageMapper.toImageResponse(imageRepository.saveAndFlush(image));
    }

    @Override
    public ImageResponse findById(String id) {

        Image image = imageRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_EXISTED));

        return imageMapper.toImageResponse(image);
    }

    @Override
    public List<Image> getAll() {
        return imageRepository.findAll();
    }

    @Override
    public List<Image> getByPostId(String postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return imageRepository.getByPost(post);
    }

    @Override
    public void deleteById(String id) {

        imageRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_EXISTED));

        imageRepository.deleteById(id);
    }
}
