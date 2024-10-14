package vn.ths.SocialNetwork.controller.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.post.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.post.CommentResponse;
import vn.ths.SocialNetwork.entity.post.Comment;
import vn.ths.SocialNetwork.services.service.post.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CommentController {

    CommentService commentService;

    @GetMapping("/{id}")
    public ApiResponse<CommentResponse> getCommentById(@PathVariable("id") String id){
        return ApiResponse.<CommentResponse>builder().result(commentService.getById(id)).build();
    }

    @GetMapping()
    public ApiResponse<List<Comment>> getAllComment(){
        return ApiResponse.<List<Comment>>builder().result(commentService.getAll()).build();
    }

    @GetMapping("/get-by-post-id/{id}")
    public ApiResponse<List<Comment>> getCommentsByPostId(@PathVariable("id") String id){
        return ApiResponse.<List<Comment>>builder().result(commentService.getByPostId(id)).build();
    }

    @PostMapping
    public ApiResponse<CommentResponse> createComment(@RequestBody CommentCreationRequest request){
        return ApiResponse.<CommentResponse>builder().result(commentService.create(request)).build();
    }

    @PutMapping("/{id}")
    public ApiResponse<CommentResponse> updateComment(@PathVariable("id") String id,
                                                      @RequestBody CommentUpdateRequest request){
        return ApiResponse.<CommentResponse>builder().result(commentService.updateById(id, request)).build();
    }

    @DeleteMapping("/{id}")
    public void deleteCommentById(@PathVariable("id") String id){
        commentService.deleteById(id);
    }

}
