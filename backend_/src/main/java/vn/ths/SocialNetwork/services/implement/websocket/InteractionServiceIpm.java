package vn.ths.SocialNetwork.services.implement.websocket;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.post.InteractionCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.InteractionUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.InteractionResponse;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.entity.websocket.Interaction;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.websocket.InteractionMapper;
import vn.ths.SocialNetwork.repository.post.InteractRepository;
import vn.ths.SocialNetwork.repository.websocket.InteractionRepository;
import vn.ths.SocialNetwork.repository.post.PostRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.websocket.InteractionService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InteractionServiceIpm implements InteractionService {

    InteractRepository interactRepository;
    UserRepository userRepository;
    PostRepository postRepository;
    InteractionRepository interactionRepository;
    InteractionMapper interactionMapper;

    @Transactional
    @Override
    public InteractionResponse create(InteractionCreationRequest request) {

        Interact interact = interactRepository.findById(request.getInteractId())
                .orElseThrow(() -> new AppException(ErrorCode.INTERACT_NOT_EXISTED));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

        if (interactionRepository.existsByInteractAndUserAndPost( interact, user, post))
            throw new AppException(ErrorCode.INTERACTION_EXISTED);

        return interactionMapper.toInteractionResponse(interactionRepository.saveAndFlush(Interaction.builder()
                        .post(post)
                        .interact(interact)
                        .user(user)
                        .build()));
    }

    @Override
    public InteractionResponse getById(String id) {

        Interaction interaction = interactionRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Interaction not found"));

        return interactionMapper.toInteractionResponse(interaction);
    }

    @Transactional
    @Override
    public InteractionResponse updateById(String id, InteractionUpdateRequest request) {

        Interaction interaction = interactionRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.INTERACTION_NOT_EXISTED));

        Interact interact = interactRepository.findById(request.getInteractId())
                .orElseThrow(() -> new AppException(ErrorCode.INTERACT_NOT_EXISTED));

        interaction.setInteract(interact);

        return interactionMapper.toInteractionResponse(interactionRepository.saveAndFlush(interaction));
    }

    @Override
    public List<Interaction> getAll() {
        return interactionRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteById(String id) {

        interactionRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INTERACTION_NOT_EXISTED));

        interactionRepository.deleteById(id);
    }
}
