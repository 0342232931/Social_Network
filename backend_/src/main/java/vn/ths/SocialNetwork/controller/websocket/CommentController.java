package vn.ths.SocialNetwork.controller.websocket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.websocket.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.websocket.CommentResponse;
import vn.ths.SocialNetwork.entity.websocket.Comment;
import vn.ths.SocialNetwork.services.service.websocket.CommentService;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CommentController {

    CommentService commentService;
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/user.sendComment")
    public CommentResponse sendComment(@Payload CommentCreationRequest request){

        CommentResponse response = commentService.create(request);

        simpMessagingTemplate.convertAndSendToUser(request.getPostId(), "/comments", response);
        return response;
    }

    @GetMapping("/get-by-post-id/{id}")
    @ResponseBody
    public ApiResponse<List<CommentResponse>> getCommentsByPostId(@PathVariable("id") String id){
        return ApiResponse.<List<CommentResponse>>builder()
                .result(commentService.getByPostId(id))
                .build();
    }

}
