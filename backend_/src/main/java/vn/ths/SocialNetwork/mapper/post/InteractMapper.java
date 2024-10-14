package vn.ths.SocialNetwork.mapper.post;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.post.InteractRequest;
import vn.ths.SocialNetwork.dto.response.post.InteractResponse;
import vn.ths.SocialNetwork.entity.post.Interact;

@Mapper(componentModel = "spring")
public interface InteractMapper {

    Interact toInteract(InteractRequest request);

    InteractResponse toInteractResponse(Interact interact);

}
