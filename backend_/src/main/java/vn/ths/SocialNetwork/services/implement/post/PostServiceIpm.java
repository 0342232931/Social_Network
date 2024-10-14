package vn.ths.SocialNetwork.services.implement.post;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.post.PostCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.PostUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.PostResponse;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.post.PostMapper;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.post.PostService;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceIpm implements PostService {

    UserRepository userRepository;
    PostRepository postRepository;
    PostMapper postMapper;

    @Transactional
    @Override
    public PostResponse create(PostCreationRequest request) {

        Post post = postMapper.toPost(request);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        LocalDate currentDate = LocalDate.now();

        post.builder()
                .createAt(currentDate)
                .user(user)
                .build();

        return postMapper.toPostResponse(postRepository.saveAndFlush(post));
    }

    @Override
    public PostResponse findById(String id) {

        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        return postMapper.toPostResponse(post);
    }

    @Transactional
    @Override
    public PostResponse updateById(String id, PostUpdateRequest request) {

        Post post = postRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        LocalDate currentDate = LocalDate.now();
        post.setUpdateAt(currentDate);

        return postMapper.toPostResponse(postRepository.saveAndFlush(post));
    }

    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getByUserId(String id) {

        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return postRepository.findPostByUser(user);

    }

    @Transactional
    @Override
    public void deleteById(String id) {

        postRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        postRepository.deleteById(id);
    }
}
