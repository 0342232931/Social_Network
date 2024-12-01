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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import vn.ths.SocialNetwork.dto.request.websocket.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.websocket.GetUsersRequest;
import vn.ths.SocialNetwork.dto.request.websocket.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.websocket.AllMessageResponse;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.dto.response.websocket.MessageResponse;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.services.service.websocket.MessageService;
import vn.ths.SocialNetwork.services.service.user.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class MessageController {

    MessageService messageService;
    SimpMessagingTemplate simpMessagingTemplate;
    UserService userService;

    @MessageMapping("/user.sendMessage")
    public MessageResponse sendMessage(@Payload MessageCreationRequest request){

        // Kiểm tra Client có tự gửi message đến chính mình không
        if (request.getReceiverUsername().equals(request.getSenderUsername())){
            throw new AppException(ErrorCode.CAN_NOT_SEND_MESSAGE);
        }
        var message = messageService.save(request);

        var sender = userService.findByUsername(request.getSenderUsername());

        Map<String, Object> map = new HashMap<>();
        map.put("group",getGroupName(request.getSenderUsername(), request.getReceiverUsername()));
        map.put("message", message);
        map.put("sender", sender);

        // Dùng SimpMessagingTemplate.converterAndSendToUser để gửi message đến người nhận qua channel /queue/messages
        simpMessagingTemplate.convertAndSendToUser(request.getReceiverUsername(), "/messages", message);
        simpMessagingTemplate.convertAndSendToUser(request.getSenderUsername(), "/messages", message);
        return message;
    }

    // Tải người dùng đã nhắn tin với user detail
    @MessageMapping("/user.loadUsers")
    public List<UserResponse> getUsers(@Payload GetUsersRequest request){
        var response = messageService.getUsersHaveMessageWithUserDetailId(request);

        simpMessagingTemplate.convertAndSendToUser(request.getUserDetailId(), "/caller-users", response);

        System.out.println(response);

        return response;
        
    }

    @PostMapping("/get-messages-by-receiver-sender")
    @ResponseBody
    public ApiResponse<AllMessageResponse> getMessages(@RequestBody AllMessageRequest request){

        var messages = messageService.getMessagesBySenderAndReceiver(request);

        var groupName = getGroupName(request.getSenderUsername(), request.getReceiverUsername());

        return ApiResponse.<AllMessageResponse>builder()
                .result(new AllMessageResponse(groupName, messages))
                .build();
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
