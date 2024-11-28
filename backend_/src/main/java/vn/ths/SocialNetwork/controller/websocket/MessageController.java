package vn.ths.SocialNetwork.controller.websocket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import vn.ths.SocialNetwork.config.CustomUserDetailsService;
import vn.ths.SocialNetwork.dto.request.websocket.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.websocket.GetUsersRequest;
import vn.ths.SocialNetwork.dto.request.websocket.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.websocket.AllMessageResponse;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
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
    CustomUserDetailsService customUserDetailsService;

    @MessageMapping("/user.sendMessage")
    @SendToUser("/topic/reply")
    public Map<String, Object> sendMessage(@Payload MessageCreationRequest request){

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getSenderUsername());
            Authentication authentication = new UsernamePasswordAuthenticationToken
                    (userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

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
        simpMessagingTemplate.convertAndSendToUser(request.getReceiverUsername(), "/queue/messages", map);

        return map;
    }

//    // Tải lịch sử message giữa 2 người dùng
//    @MessageMapping("/user.loadMessages")
//    @SendToUser("/topic/caller")
//    public AllMessageResponse getMessages(@Payload AllMessageRequest request){
//
//        var messages = messageService.getMessagesBySenderAndReceiver(request);
//
//        var groupName = getGroupName(request.getSenderUsername(), request.getReceiverUsername());
//
//        return new AllMessageResponse(groupName, messages);
//    }

    // Tải người dùng đã nhắn tin với user detail
    @MessageMapping("/user.loadUsers")
    @SendToUser("/topic/caller-users")
    public List<UserResponse> getUsers(@Payload GetUsersRequest request){

        return messageService.getUsersHaveMessageWithUserDetailId(request);
        
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
