package vn.ths.SocialNetwork.services.service.websocket;

import vn.ths.SocialNetwork.dto.request.websocket.*;
import vn.ths.SocialNetwork.dto.response.websocket.CheckIsFriendResponse;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationDeleteResponse;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationResponse;

import java.util.List;

public interface NotificationService {
    public NotificationResponse save(NotificationCreationRequest request);
    public List<NotificationResponse> getNotificationsByReceiverId(String id);
    public List<NotificationResponse> getNotificationsTypeAddFriendByReceiverId(String id);
    public List<NotificationDeleteResponse> deleteById(NotificationDeleteRequest request);
    public void deleteBySenderAndReceiverAndTypeAddFriend(DeleteNotificationBySARRequest request);
}
