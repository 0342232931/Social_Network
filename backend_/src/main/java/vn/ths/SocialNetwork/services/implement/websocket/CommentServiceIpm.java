package vn.ths.SocialNetwork.services.implement.post;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.post.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.CommentResponse;
import vn.ths.SocialNetwork.entity.post.Comment;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.post.CommentMapper;
import vn.ths.SocialNetwork.repository.post.CommentRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.post.CommentService;

import java.time.LocalDate;
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

        // Set Attribute
        comment.builder()
                .createAt(currentDate)
                .user(user)
                .post(post)
                .build();

        return commentMapper.toCommentResponse(commentRepository.saveAndFlush(comment));
    }

    @Override
    public CommentResponse getById(String id) {

        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));

        return commentMapper.toCommentResponse(comment);
    }

    @Transactional
    @Override
    public CommentResponse updateById(String id, CommentUpdateRequest request) {

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        commentMapper.updateComment(comment, request);

        LocalDate currentDate = LocalDate.now();
        comment.setUpdateAt(currentDate);

        return commentMapper.toCommentResponse(commentRepository.saveAndFlush(comment));
    }

    @Override
    public List<Comment> getAll() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> getByPostId(String postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        return commentRepository.getByPost(post);
    }

    @Transactional
    @Override
    public void deleteById(String id) {

        commentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

        commentRepository.deleteById(id);
    }
}
