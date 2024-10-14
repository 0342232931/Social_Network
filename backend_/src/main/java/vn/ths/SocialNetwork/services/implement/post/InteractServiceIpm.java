package vn.ths.SocialNetwork.services.implement.post;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.post.InteractRequest;
import vn.ths.SocialNetwork.dto.response.post.InteractResponse;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.post.InteractMapper;
import vn.ths.SocialNetwork.repository.post.InteractRepository;
import vn.ths.SocialNetwork.services.service.post.InteractService;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InteractServiceIpm implements InteractService {

    InteractRepository interactRepository;
    InteractMapper interactMapper;

    @Transactional
    @Override
    public InteractResponse create(InteractRequest request) {

        if (interactRepository.existsByInteractType(request.getInteractType())){
            throw new AppException(ErrorCode.INTERACT_EXISTED);
        }

        Interact interact = interactMapper.toInteract(request);

        return interactMapper.toInteractResponse(interactRepository.saveAndFlush(interact));
    }

    @Override
    public InteractResponse findById(String id) {

        Interact interact = interactRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Interact not existed"));

        return interactMapper.toInteractResponse(interact);
    }

    @Override
    public List<Interact> getAll() {
        return interactRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteById(String id) {

        interactRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INTERACT_NOT_EXISTED));

        interactRepository.deleteById(id);
    }
}
