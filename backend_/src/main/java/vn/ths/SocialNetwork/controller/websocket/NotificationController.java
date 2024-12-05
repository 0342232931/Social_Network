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
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.websocket.DeleteNotificationBySARRequest;
import vn.ths.SocialNetwork.dto.request.websocket.GetNotificationsRequest;
import vn.ths.SocialNetwork.dto.request.websocket.NotificationCreationRequest;
import vn.ths.SocialNetwork.dto.request.websocket.NotificationDeleteRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.websocket.NotificationDeleteResponse;
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
    public NotificationResponse sendNotification(@Payload NotificationCreationRequest request){

        if (request.getSenderUsername().equals(request.getReceiverUsername()))
            throw new AppException(ErrorCode.CAN_NOT_SEND_NOTIFICATION);

        NotificationResponse notificationResponse = notificationService.save(request);

        if (notificationResponse.getType().equals("ADD_FRIEND"))
            simpMessagingTemplate.convertAndSendToUser(request.getReceiverUsername(),
                    "/notification-type-add-friend", notificationResponse);

        simpMessagingTemplate.convertAndSendToUser(request.getReceiverUsername(),
                "/notification", notificationResponse);

        return notificationResponse;
    }

    @MessageMapping("/user.deleteNotification")
    public List<NotificationDeleteResponse> deleteNotification(@Payload NotificationDeleteRequest request){

        List<NotificationDeleteResponse> notificationResponses = notificationService.deleteById(request);

        if(request.getIsAddFriend().equals("true"))
            simpMessagingTemplate.convertAndSendToUser
                    (request.getUserId(), "/notification-add-friend-delete", notificationResponses);

        simpMessagingTemplate.convertAndSendToUser(request.getUserId(),
                "/notification-delete", notificationResponses);

        return notificationResponses;
    }

    @PostMapping("/delete-by-sra")
    @ResponseBody
    public ApiResponse<?> deleteByReceiverAndSenderAndTypeAddFriend(@RequestBody DeleteNotificationBySARRequest request ){
        notificationService.deleteBySenderAndReceiverAndTypeAddFriend(request);
        return ApiResponse.builder().build();
    }

    @GetMapping("/get-notifications-add-friend-by-id/{id}")
    @ResponseBody
    public List<NotificationResponse> getNotificationsAddFriend(@PathVariable("id") String id){
        return notificationService.getNotificationsTypeAddFriendByReceiverId(id);
    }

    @GetMapping("/get-notifications-by-id/{id}")
    @ResponseBody
    public List<NotificationResponse> getNotifications(@PathVariable("id") String id){
        return notificationService.getNotificationsByReceiverId(id);
    }

}
