package vn.ths.SocialNetwork.services.implement.websocket;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.websocket.*;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.dto.response.websocket.CheckIsFriendResponse;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationDeleteResponse;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.entity.websocket.Notification;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.UserMapper;
import vn.ths.SocialNetwork.mapper.websocket.NotificationMapper;
import vn.ths.SocialNetwork.repository.user.AvatarRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.repository.websocket.NotificationRepository;
import vn.ths.SocialNetwork.services.service.websocket.NotificationService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationServiceIpm implements NotificationService {

    NotificationRepository notificationRepository;
    NotificationMapper notificationMapper;
    UserRepository userRepository;
    UserMapper userMapper;
    AvatarRepository avatarRepository;

    @Override
    @Transactional
    public NotificationResponse save(NotificationCreationRequest request) {

        Notification notification = notificationMapper.toNotification(request);

        User sender = userRepository.findByUsername(request.getSenderUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        User receiver = userRepository.findByUsername(request.getReceiverUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        notification.setSender(sender);
        notification.setReceiver(receiver);
        notification.setCreateAt(LocalDateTime.now());
        notification.setId(UUID.randomUUID().toString());
        notification.setContent(request.getContent());

        NotificationResponse response = notificationMapper.toNotificationResponse
                (notificationRepository.saveAndFlush(notification));

        response.setSender(userMapper.toUserResponse(sender));
        response.setReceiver(userMapper.toUserResponse(receiver));
        response.setContent(notification.getContent());

        Avatar avatar = avatarRepository.getByUserId(sender.getId())
                .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));
        String data = Base64.getEncoder().encodeToString(avatar.getData());

        response.setAvatarUrl(data);
        return response;
    }

    @Override
    public List<NotificationResponse> getNotificationsTypeAddFriendByReceiverId(String id) {

        List<Notification> notifications = notificationRepository.getByTypeAndReceiverId("ADD_FRIEND", id);

        List<NotificationResponse> responses = new ArrayList<>();

        notifications.forEach((notification) -> {

            NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
            notificationResponse.setSender(userMapper.toUserResponse(notification.getSender()));
            notificationResponse.setReceiver(userMapper.toUserResponse(notification.getReceiver()));
            notificationResponse.setContent(notification.getContent());

            Avatar avatar = avatarRepository.getByUserId(notification.getSender().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));
            String data = Base64.getEncoder().encodeToString(avatar.getData());
            notificationResponse.setAvatarUrl(data);

            responses.add(notificationResponse);

        });

        return responses;
    }

    @Override
    public List<NotificationResponse> getNotificationsByReceiverId(String id) {

        List<Notification> notifications = notificationRepository.getNotificationsByReceiverId(id);

        List<NotificationResponse> responses = new ArrayList<>();

        notifications.forEach((notification) -> {

            NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
            notificationResponse.setSender(userMapper.toUserResponse(notification.getSender()));
            notificationResponse.setReceiver(userMapper.toUserResponse(notification.getReceiver()));
            notificationResponse.setContent(notification.getContent());

            Avatar avatar = avatarRepository.getByUserId(notification.getSender().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));
            String data = Base64.getEncoder().encodeToString(avatar.getData());
            notificationResponse.setAvatarUrl(data);

            responses.add(notificationResponse);
        });

        return responses;
    }

    @Override
    @Transactional
    public List<NotificationDeleteResponse> deleteById(NotificationDeleteRequest request) {

        notificationRepository.deleteById(request.getNotificationId());

        List<NotificationDeleteResponse> responses = new ArrayList<>();

        if (request.getIsAddFriend().equals("true")){
            List<Notification> notifications = notificationRepository
                    .getByTypeAndReceiverId("ADD_FRIEND", request.getUserId());

            notifications.forEach((notification) -> {

                Avatar avatar = avatarRepository.getByUserId(notification.getSender().getId())
                        .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));
                String data = Base64.getEncoder().encodeToString(avatar.getData());

                NotificationDeleteResponse notificationResponse = new NotificationDeleteResponse();
                notificationResponse.setSender(userMapper.toUserResponse(notification.getSender()));
                notificationResponse.setReceiver(userMapper.toUserResponse(notification.getReceiver()));
                notificationResponse.setId(notification.getId());
                notificationResponse.setType(notificationResponse.getType());
                notificationResponse.setCreateAt(notification.getCreateAt());
                notificationResponse.setContent(notification.getContent());
                notificationResponse.setAvatarUrl(data);

                responses.add(notificationResponse);

            });
        } else {
            List<Notification> notifications = notificationRepository.getNotificationsByReceiverId(request.getUserId());

            notifications.forEach((notification) -> {

                Avatar avatar = avatarRepository.getByUserId(notification.getSender().getId())
                        .orElseThrow(() -> new AppException(ErrorCode.AVATAR_NOT_EXISTED));
                String data = Base64.getEncoder().encodeToString(avatar.getData());

                NotificationDeleteResponse notificationResponse = new NotificationDeleteResponse();
                notificationResponse.setSender(userMapper.toUserResponse(notification.getSender()));
                notificationResponse.setReceiver(userMapper.toUserResponse(notification.getReceiver()));
                notificationResponse.setId(notification.getId());
                notificationResponse.setType(notificationResponse.getType());
                notificationResponse.setCreateAt(notification.getCreateAt());
                notificationResponse.setContent(notification.getContent());
                notificationResponse.setAvatarUrl(data);

                responses.add(notificationResponse);

            });
        }
        return responses;
    }

    @Override
    @Transactional
    public void deleteBySenderAndReceiverAndTypeAddFriend(DeleteNotificationBySARRequest request) {
        Notification notification = notificationRepository.checkIsSendNotificationAddFriend
                ("ADD_FRIEND", request.getSenderId(), request.getReceiverId());
        if (notification != null)
            notificationRepository.delete(notification);
        else
            throw new AppException(ErrorCode.NOTIFICATION_NOT_EXISTS);
    }
}
