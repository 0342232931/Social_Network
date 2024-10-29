package vn.ths.SocialNetwork.controller.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.post.PostCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.PostUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.post.PostResponse;
import vn.ths.SocialNetwork.entity.post.Post;
import vn.ths.SocialNetwork.services.service.post.ImageService;
import vn.ths.SocialNetwork.services.service.post.PostService;

import java.util.List;

@RestController
@RequestMapping("/posts")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PostController {

    ImageService imageService;
    PostService postService;

    @GetMapping("/{id}")
    public ApiResponse<PostResponse> getPostResponse(@PathVariable("id") String id){
        return ApiResponse.<PostResponse>builder().result(postService.findById(id)).build();
    }

    @GetMapping
    public ApiResponse<List<Post>> getAllPost(){
        return ApiResponse.<List<Post>>builder().result(postService.getAll()).build();
    }

    @GetMapping("/get-by-user-id/{id}")
    public ApiResponse<List<Post>> getPostByUserId(@PathVariable("id") String id){
        return ApiResponse.<List<Post>>builder().result(postService.getByUserId(id)).build();
    }

    @GetMapping("/get-new-post-by-user-auth/{id}")
    public ApiResponse<List<Post>> getNewPostByFriendForUserAuth(@PathVariable("id") String id){
        return ApiResponse.<List<Post>>builder()
                .result(postService.getAllNewPostForFriendsOfUserAuthenticated(id))
                .build();
    }

    @PostMapping()
    public ApiResponse<PostResponse> createPost(@RequestBody PostCreationRequest request){
        return ApiResponse.<PostResponse>builder()
                .result(postService.create(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<PostResponse> updatePost(@PathVariable("id") String id, @RequestBody PostUpdateRequest request){
        return ApiResponse.<PostResponse>builder()
                .result(postService.updateById(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable("id") String id){
        postService.deleteById(id);
    }

}
