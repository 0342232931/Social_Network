package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.user.UserCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.UserUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.services.service.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {

    UserService userService;

    @PostMapping()
    public ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request){
        return ApiResponse.<UserResponse>builder()
                .result(userService.create(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable("id") String id){
        return ApiResponse.<UserResponse>builder()
                .result(userService.findById(id))
                .build();
    }

    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo(){
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping()
    public ApiResponse<List<User>> getUsers(){
        return ApiResponse.<List<User>>builder()
                .result(userService.getAll())
                .build();
    }

    @GetMapping("/search-user/{keyword}")
    public ApiResponse<List<UserResponse>> searchUser(@PathVariable("keyword") String keyword){
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.searchUsersByKeyword(keyword))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUserById(@PathVariable("id") String id, @RequestBody UserUpdateRequest request){
        System.out.println(request);
        var res = userService.updateById(id, request);
        System.out.println(res);
        return ApiResponse.<UserResponse>builder()
                .result(res)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteById(@PathVariable("id") String id){
        userService.deleteById(id);
        return ApiResponse.builder()
                .result("Delete Success!")
                .build();
    }

}
