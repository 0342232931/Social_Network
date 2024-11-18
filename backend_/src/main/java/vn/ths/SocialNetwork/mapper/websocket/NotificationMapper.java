package vn.ths.SocialNetwork.mapper.websocket;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.websocket.NotificationCreationRequest;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationResponse;
import vn.ths.SocialNetwork.entity.websocket.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receiver", ignore = true)
    Notification toNotification(NotificationCreationRequest request);

    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receiver", ignore = true)
    NotificationResponse toNotificationResponse(Notification notification);
}
