package vn.ths.SocialNetwork.services.implement.websocket;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.websocket.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AvatarInCommentResponse;
import vn.ths.SocialNetwork.dto.response.websocket.CommentResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.entity.websocket.Comment;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.websocket.CommentMapper;
import vn.ths.SocialNetwork.repository.user.AvatarRepository;
import vn.ths.SocialNetwork.repository.websocket.CommentRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.websocket.CommentService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentServiceIpm implements CommentService {

    UserRepository userRepository;
    PostRepository postRepository;
    CommentRepository commentRepository;
    CommentMapper commentMapper;
    AvatarRepository avatarRepository;

    @Transactional
    @Override
    public CommentResponse create(CommentCreationRequest request) {

        Comment comment = commentMapper.toComment(request);

        // Find user in Comment
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Find post in Comment
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        // Create time
        LocalDate currentDate = LocalDate.now();

        Comment result = commentRepository.saveAndFlush(Comment.builder()
                        .content(request.getContent())
                        .post(post)
                        .user(user)
                        .createAt(currentDate)
                        .build());

        Avatar avatar = avatarRepository.getByUserId(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));

        String dataAvatar = Base64.getEncoder().encodeToString(avatar.getData());

        AvatarInCommentResponse avatarInCommentResponse = new AvatarInCommentResponse
                (avatar.getId(), avatar.getFileName(), avatar.getFileType(), dataAvatar);

        return CommentResponse.builder()
                .id(result.getId())
                .content(result.getContent())
                .post(result.getPost())
                .user(result.getUser())
                .avatarUser(avatarInCommentResponse)
                .build();
    }

    @Override
    public List<CommentResponse> getByPostId(String postId) {

        List<CommentResponse> responses = new ArrayList<>();

        List<Comment> comments = commentRepository.getByPostId(postId);

        comments.forEach((comment) -> {

            Avatar avatar = avatarRepository.getByUserId(comment.getUser().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));

            String avatarData = Base64.getEncoder().encodeToString(avatar.getData());

            AvatarInCommentResponse avatarInCommentResponse =  new AvatarInCommentResponse
                    (avatar.getId(), avatar.getFileName(), avatar.getFileType(), avatarData);

            responses.add(CommentResponse.builder()
                            .id(comment.getId())
                            .content(comment.getContent())
                            .post(comment.getPost())
                            .user(comment.getUser())
                            .avatarUser(avatarInCommentResponse)
                            .build());

        });

        return responses;
    }

    @Transactional
    @Override
    public void deleteById(String id) {

        commentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        commentRepository.deleteById(id);
    }
}
