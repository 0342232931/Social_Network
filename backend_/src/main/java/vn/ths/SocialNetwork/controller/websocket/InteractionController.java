package vn.ths.SocialNetwork.controller.websocket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.post.InteractionCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.InteractionUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.post.InteractionResponse;
import vn.ths.SocialNetwork.services.service.websocket.InteractionService;

@RestController
@RequestMapping("interactions")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InteractionController {

    InteractionService interactionService;

    @PostMapping()
    ApiResponse<InteractionResponse> create(@RequestBody InteractionCreationRequest request){

        return ApiResponse.<InteractionResponse>builder()
                .result(interactionService.create(request))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<InteractionResponse> getById(@PathVariable("id") String id){

        return ApiResponse.<InteractionResponse>builder()
                .result(interactionService.getById(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<InteractionResponse> update(@PathVariable("id") String id,
                                            @RequestBody InteractionUpdateRequest request){

        return ApiResponse.<InteractionResponse>builder()
                .result(interactionService.updateById(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<?> delete(@PathVariable("id") String id){

        interactionService.deleteById(id);

        return ApiResponse.builder().result("Delete Success!").build();
    }

}
