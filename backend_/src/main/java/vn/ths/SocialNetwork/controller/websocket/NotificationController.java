package vn.ths.SocialNetwork.controller.websocket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import vn.ths.SocialNetwork.dto.request.websocket.GetNotificationsRequest;
import vn.ths.SocialNetwork.dto.request.websocket.NotificationCreationRequest;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationResponse;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.services.service.websocket.NotificationService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {

    NotificationService notificationService;
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/user.sendNotification")
    @SendToUser("/topic/reply-notification")
    public NotificationResponse sendNotification(@Payload NotificationCreationRequest request){

        if (request.getSenderUsername().equals(request.getReceiverUsername()))
            throw new AppException(ErrorCode.CAN_NOT_SEND_NOTIFICATION);

        NotificationResponse notificationResponse = notificationService.save(request);

        simpMessagingTemplate.convertAndSendToUser(request.getReceiverUsername(),
                "/queue/notification", notificationResponse);

        return notificationResponse;
    }

    @MessageMapping("/user.loadNotifications")
    @SendToUser("/topic/caller-notifications")
    public List<NotificationResponse> getNotifications(@Payload GetNotificationsRequest request){
        return notificationService.getNotificationsByReceiverId(request);
    }

}
