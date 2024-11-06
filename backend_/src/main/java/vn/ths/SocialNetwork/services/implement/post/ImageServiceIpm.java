package vn.ths.SocialNetwork.services.implement.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.dto.response.post.ImageResponse;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.repository.post.ImageRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.services.service.post.ImageService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

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

    @Override
    public List<ImageResponse> getImagesByPostId(String postId) {

        List<Image> images = imageRepository.getAllImageByPostId(postId);

        if (images.isEmpty())
            return null;

        List<ImageResponse> responses = new ArrayList<>();

        for (Image image : images) {
            String data = Base64.getEncoder().encodeToString(image.getData());

            responses.add(ImageResponse.builder()
                            .id(image.getId())
                            .fileName(image.getFileName())
                            .fileType(image.getFileType())
                            .data(data)
                            .post(image.getPost())
                            .build());
        }

        return responses;
    }

    private void handleAddImageToResponse(List<ImageResponse> response, Post post){

        List<Image> images = imageRepository.getAllImageByPostId(post.getId());

        for (Image image: images) {
            String dataEncode = Base64.getEncoder().encodeToString(image.getData());
            response.add(ImageResponse.builder()
                            .id(image.getId())
                            .fileName(image.getFileName())
                            .fileType(image.getFileType())
                            .data(dataEncode)
                            .post(image.getPost())
                            .build());
        }
    }

    @Override
    public List<ImageResponse> getByUserId(String userId) {

        List<Post> posts = postRepository.findPostByUserId(userId);
        List<ImageResponse> response = new ArrayList<>();

        for (Post post: posts){
            handleAddImageToResponse(response, post);
        }

        return response;
    }
}
