package vn.ths.SocialNetwork.services.implement.websocket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.websocket.GetNotificationsRequest;
import vn.ths.SocialNetwork.dto.request.websocket.NotificationCreationRequest;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationResponse;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.entity.websocket.Notification;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.UserMapper;
import vn.ths.SocialNetwork.mapper.websocket.NotificationMapper;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.repository.websocket.NotificationRepository;
import vn.ths.SocialNetwork.services.service.websocket.NotificationService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationServiceIpm implements NotificationService {

    NotificationRepository notificationRepository;
    NotificationMapper notificationMapper;
    UserRepository userRepository;
    UserMapper userMapper;

    @Override
    public NotificationResponse save(NotificationCreationRequest request) {

        Notification notification = notificationMapper.toNotification(request);

        User sender = userRepository.findByUsername(request.getSenderUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        User receiver = userRepository.findByUsername(request.getReceiverUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        notification.setSender(sender);
        notification.setReceiver(receiver);

        NotificationResponse response = notificationMapper.toNotificationResponse
                (notificationRepository.saveAndFlush(notification));
        response.setSender(userMapper.toUserResponse(sender));
        response.setReceiver(userMapper.toUserResponse(receiver));

        return response;
    }

    @Override
    public List<NotificationResponse> getNotificationsByReceiverId(GetNotificationsRequest request) {

        List<Notification> notifications = notificationRepository.getNotificationsByReceiverId(request.getReceiverId());

        List<NotificationResponse> responses = new ArrayList<>();

        notifications.forEach((notification) -> {

            NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
            notificationResponse.setSender(userMapper.toUserResponse(notification.getSender()));
            notificationResponse.setReceiver(userMapper.toUserResponse(notification.getReceiver()));

            responses.add(notificationResponse);
        });

        return responses;
    }
}
