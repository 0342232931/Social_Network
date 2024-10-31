package vn.ths.SocialNetwork.controller.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.post.InteractRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.post.InteractResponse;
import vn.ths.SocialNetwork.entity.post.Interact;
import vn.ths.SocialNetwork.services.service.post.InteractService;

import java.util.List;

@RestController
@RequestMapping("/interacts")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InteractController {

    InteractService interactService;

    @PostMapping()
    ApiResponse<InteractResponse> create(@RequestBody InteractRequest request){

        return ApiResponse.<InteractResponse>builder()
                .result(interactService.create(request))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<InteractResponse> findById(@PathVariable("id") String id){

        return ApiResponse.<InteractResponse>builder()
                .result(interactService.findById(id))
                .build();
    }

    @GetMapping()
    ApiResponse<List<Interact>> getAll(){

        return ApiResponse.<List<Interact>>builder()
                .result(interactService.getAll())
                .build();
    }

    @DeleteMapping()
    ApiResponse<?> delete(@PathVariable("id") String id){

        interactService.deleteById(id);

        return ApiResponse.builder().result("Delete Success!").build();
    }

}
