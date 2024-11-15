package vn.ths.SocialNetwork.controller.chat;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import vn.ths.SocialNetwork.dto.request.chat.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.chat.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.chat.AllMessageResponse;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.services.service.chat.MessageService;
import vn.ths.SocialNetwork.services.service.user.UserService;

import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class MessageController {

    MessageService messageService;
    SimpMessagingTemplate simpMessagingTemplate;
    UserService userService;

    // Phương thức này sẽ được kích hoạt khi có message từ Client gửi đến endpoint /user.sendMessage
    @MessageMapping("/user.sendMessage")
    @SendToUser("/topic/reply") // Phản hồi sẽ được gửi đến user vừa gửi message qua channel /topic/reply.
    public Map<String, Object> sendMessage(@Payload MessageCreationRequest request){

        // Kiểm tra Client có tự gửi message đến chính mình không
        if (request.getReceiverUsername().equals(request.getSenderUsername())){
            throw new AppException(ErrorCode.CAN_NOT_SEND_MESSAGE);
        }

        var message = messageService.save(request);

        var sender = userService.findById(request.getSenderUsername());

        // Tạo dữ liệu cho phản hồi
        Map<String, Object> map = new HashMap<>();
        map.put("group",getGroupName(request.getSenderUsername(), request.getReceiverUsername()));
        map.put("message", message);
        map.put("sender", sender);

        // Dùng SimpMessagingTemplate.converterAndSendToUser để gửi message đến người nhận qua channel /queue/messages
        simpMessagingTemplate.convertAndSendToUser(request.getReceiverUsername(), "/queue/messages", map);

        return map;
    }

    // Tải lịch sử message giữa 2 người dùng
    @MessageMapping("/user.loadMessages")
    @SendToUser("/topic/caller")
    public AllMessageResponse getMessages(@Payload AllMessageRequest request){

        var messages = messageService.getMessagesBySenderAndReceiver(request);

        var groupName = getGroupName(request.getSenderUsername(), request.getReceiverUsername());

        return new AllMessageResponse(groupName, messages);
    }

    // Tạo tên nhóm chung giữa 2 người dùng để xác định các message trong cuộc trò chuyện
    private String getGroupName(String senderUsername, String recipientUsername){

        // So sánh senderUsername và recipientUsername qua thứ tự alphabet,
        // senderUsername > recipientUsername => tên nhóm sẽ là senderUsername-recipientUsername và ngược lại
        int result = senderUsername.compareToIgnoreCase(recipientUsername);
        if(result > 0)
            return senderUsername+"-"+recipientUsername;
        return recipientUsername+"-"+senderUsername;
    }
}
