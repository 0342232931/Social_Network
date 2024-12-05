package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.user.RelationAddFriendRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationDeleteFriendRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CheckIsFriendRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.RelationResponse;
import vn.ths.SocialNetwork.dto.response.websocket.AddFriendResponse;
import vn.ths.SocialNetwork.dto.response.websocket.CheckIsFriendResponse;
import vn.ths.SocialNetwork.entity.user.Relation;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.services.service.user.RelationService;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RelationController {

    RelationService relationService;
    SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/get-friends-by-user-id/{id}")
    @ResponseBody
    ApiResponse<List<User>> getFriendsByUserId(@PathVariable("id") String userId){
        return ApiResponse.<List<User>>builder()
                .result(relationService.getFriendsByUserId(userId))
                .build();
    }

    @PostMapping("/create-relation")
    @ResponseBody
    ApiResponse<Relation> create(@RequestBody RelationCreationRequest request){
        return ApiResponse.<Relation>builder()
                .result(relationService.create(request))
                .build();
    }

    @MessageMapping("/user.add-friend")
    ApiResponse<AddFriendResponse> addFriend(@Payload RelationAddFriendRequest request){

        AddFriendResponse addFriendResponse = relationService.addFriend(request);

        RelationAddFriendRequest request2 = new RelationAddFriendRequest(request.getFriendId(), request.getUserId());
        AddFriendResponse response2 = relationService.addFriend(request2);

        simpMessagingTemplate.convertAndSendToUser(request.getUserId(), "/friend", addFriendResponse);
        simpMessagingTemplate.convertAndSendToUser(request.getFriendId(), "/friend", addFriendResponse);

        return ApiResponse.<AddFriendResponse>builder()
                .result(addFriendResponse)
                .build();
    }

    @MessageMapping("/user.check-is-friend")
    ApiResponse<CheckIsFriendResponse> checkIsFriend(@Payload CheckIsFriendRequest request){

        var response = relationService.checkIsFriend(request);

        simpMessagingTemplate.convertAndSendToUser(request.getUserId(), "/check-is-friend", response);

        return ApiResponse.<CheckIsFriendResponse>builder()
                .result(response)
                .build();
    }

    @PostMapping("/check-friend")
    @ResponseBody
    ApiResponse<CheckIsFriendResponse> getCheckIsFriend(@RequestBody CheckIsFriendRequest request){
        var response = relationService.checkIsFriend(request);
        return ApiResponse.<CheckIsFriendResponse>builder()
                .result(response)
                .build();
    }

    @PutMapping("/delete-friend/{id}")
    @ResponseBody
    ApiResponse<RelationResponse> deleteFriend(@PathVariable("id") String userId,
                                               @RequestBody RelationDeleteFriendRequest request){
        return ApiResponse.<RelationResponse>builder()
                .result(relationService.deleteFriend(userId, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    ApiResponse<?> deleteById(@PathVariable("id") String id){
        relationService.deleteRelationById(id);
        return ApiResponse.builder().build();
    }

}
