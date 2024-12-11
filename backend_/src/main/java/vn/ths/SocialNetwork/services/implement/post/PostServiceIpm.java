package vn.ths.SocialNetwork.services.implement.post;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.post.PostCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.PostUpdateRequest;
import vn.ths.SocialNetwork.dto.response.PageResponse;
import vn.ths.SocialNetwork.dto.response.post.CountInteractResponse;
import vn.ths.SocialNetwork.dto.response.post.PostResponse;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.post.PostMapper;
import vn.ths.SocialNetwork.repository.post.InteractRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.repository.websocket.CommentRepository;
import vn.ths.SocialNetwork.repository.websocket.InteractionRepository;
import vn.ths.SocialNetwork.services.service.post.PostService;
import vn.ths.SocialNetwork.services.service.user.RelationService;
import vn.ths.SocialNetwork.services.service.user.UserService;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceIpm implements PostService {

    UserRepository userRepository;
    PostRepository postRepository;
    CommentRepository commentRepository;
    InteractionRepository interactionRepository;
    PostMapper postMapper;
    RelationService relationService;

    @Transactional
    @Override
    public PostResponse create(PostCreationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        LocalDate currentDate = LocalDate.now();
        return postMapper.toPostResponse(postRepository.saveAndFlush(Post.builder()
                        .createAt(currentDate)
                        .content(request.getContent())
                        .user(user)
                        .build()));
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
    public PageResponse<PostResponse> getFriendPosts(int page, int size, String userId) {

        List<User> friends = relationService.getFriendsByUserId(userId);
        List<String> postIds = new ArrayList<>();

        friends.forEach((friend) -> {
            List<String> allPostIdFriend = postRepository.findAllPostIdByUserId(friend.getId());

            if (allPostIdFriend != null)
                postIds.addAll(allPostIdFriend);
        });

        Sort sort = Sort.by("createAt").descending();
        PageRequest pageRequest = PageRequest.of(page - 1, size, sort);

        var pageData = postRepository.findAllPostById(postIds, pageRequest);

        return PageResponse.<PostResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPage(pageData.getTotalPages())
                .totalElement(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(postMapper::toPostResponse).toList())
                .build();
    }

    @Override
    public PostResponse getPostAdmin() {

        Post post = postRepository.findById("eb9798cd-02fe-4f2e-9")
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        return postMapper.toPostResponse(post);
    }

    @Override
    public CountInteractResponse CountInteract(String id) {

        int interactQuantity = interactionRepository.countInteractionInPostByPostId(id);
        int commentQuantity = commentRepository.countCommentInPostByPostId(id);

        return CountInteractResponse.builder()
                .interactQuantity(interactQuantity)
                .commentQuantity(commentQuantity)
                .build();
    }

    @Override
    public List<Post> getAllNewPostForFriendsOfUserAuthenticated(String userId) {

        List<User> friends = relationService.getFriendsByUserId(userId);
        List<Post> posts = null;

        for (User friend : friends) {
            List<Post> allPost = postRepository.findPostByUser(friend);
            addPostInPosts(allPost, posts);
        }

        return posts;
    }

    private void addPostInPosts(List<Post> posts, List<Post> result) {
        LocalDateTime now = LocalDateTime.now();
        for (Post post: posts) {
            if (post.getCreateAt() != null && ChronoUnit.DAYS.between(post.getCreateAt(), now) <= 3){
                result.add(post);
            }
        }
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
