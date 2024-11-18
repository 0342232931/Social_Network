package vn.ths.SocialNetwork.mapper.websocket;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.websocket.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.websocket.MessageResponse;
import vn.ths.SocialNetwork.entity.websocket.Message;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receiver", ignore = true)
    Message toMessage(MessageCreationRequest request);

    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receiver", ignore = true)
    MessageResponse toMessageResponse(Message message);
}
