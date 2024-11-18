package vn.ths.SocialNetwork.mapper.websocket;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.post.InteractionCreationRequest;
import vn.ths.SocialNetwork.dto.response.post.InteractionResponse;
import vn.ths.SocialNetwork.entity.websocket.Interaction;

@Mapper(componentModel = "spring")
public interface InteractionMapper {

    @Mapping(target = "interact", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "post", ignore = true)
    Interaction toInteraction(InteractionCreationRequest request);

    InteractionResponse toInteractionResponse(Interaction interaction);

}
