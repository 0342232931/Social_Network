package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.user.RelationAddFriendRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationDeleteFriendRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.RelationResponse;
import vn.ths.SocialNetwork.entity.user.Relation;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.services.service.user.RelationService;

import java.util.List;

@RestController
@RequestMapping("/relations")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RelationController {

    RelationService relationService;

    @GetMapping("/{id}")
    ApiResponse<RelationResponse> getById(@PathVariable("id") String id){
        return ApiResponse.<RelationResponse>builder()
                .result(relationService.getById(id))
                .build();
    }

    @GetMapping("/get-friends-by-user-id/{id}")
    ApiResponse<List<User>> getFriendsByUserId(@PathVariable("id") String userId){
        return ApiResponse.<List<User>>builder()
                .result(relationService.getFriendsByUserId(userId))
                .build();
    }

    @GetMapping()
    ApiResponse<List<Relation>> getAll(){
        return ApiResponse.<List<Relation>>builder()
                .result(relationService.getAll())
                .build();
    }

    @PostMapping()
    ApiResponse<RelationResponse> create(@RequestBody RelationCreationRequest request){
        return ApiResponse.<RelationResponse>builder()
                .result(relationService.create(request))
                .build();
    }

    @PutMapping("/add-friend/{id}")
    ApiResponse<RelationResponse> addFriend(@PathVariable("id") String userId,
                                            @RequestBody RelationAddFriendRequest request){
        return ApiResponse.<RelationResponse>builder()
                .result(relationService.addFriend(userId, request))
                .build();
    }

    @PutMapping("/delete-friend/{id}")
    ApiResponse<RelationResponse> deleteFriend(@PathVariable("id") String userId,
                                               @RequestBody RelationDeleteFriendRequest request){
        return ApiResponse.<RelationResponse>builder()
                .result(relationService.deleteFriend(userId, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<?> deleteById(@PathVariable("id") String id){
        relationService.deleteRelationById(id);
        return ApiResponse.builder().build();
    }

}
