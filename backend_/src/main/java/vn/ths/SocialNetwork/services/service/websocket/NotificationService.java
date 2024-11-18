package vn.ths.SocialNetwork.services.service.websocket;

import vn.ths.SocialNetwork.dto.request.websocket.GetNotificationsRequest;
import vn.ths.SocialNetwork.dto.request.websocket.NotificationCreationRequest;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationResponse;

import java.util.List;

public interface NotificationService {
    public NotificationResponse save(NotificationCreationRequest request);
    public List<NotificationResponse> getNotificationsByReceiverId(GetNotificationsRequest request);
}
