package vn.ths.SocialNetwork.mapper.chat;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.chat.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.chat.MessageResponse;
import vn.ths.SocialNetwork.entity.chat.Message;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receiver", ignore = true)
    Message toMessage(MessageCreationRequest request);

    @Mapping(target = "senderUsername", ignore = true)
    @Mapping(target = "receiverUsername", ignore = true)
    MessageResponse toMessageResponse(Message message);
}
