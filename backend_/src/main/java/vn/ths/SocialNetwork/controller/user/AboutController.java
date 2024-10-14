package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.user.AboutCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AboutUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.AboutResponse;
import vn.ths.SocialNetwork.entity.user.About;
import vn.ths.SocialNetwork.services.service.user.AboutService;

import java.util.List;

@RestController
@RequestMapping("/abouts")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AboutController {

    AboutService aboutService;

    @PostMapping()
    ApiResponse<AboutResponse> createAbout(@RequestBody AboutCreationRequest request){
        return ApiResponse.<AboutResponse>builder()
                .result(aboutService.create(request))
                .build();
    }

    @GetMapping()
    ApiResponse<List<About>> getAll(){
        return ApiResponse.<List<About>>builder()
                .result(aboutService.getALl())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<AboutResponse> getById(@PathVariable("id") String id){
        return ApiResponse.<AboutResponse>builder()
                .result(aboutService.getById(id))
                .build();
    }

    @GetMapping("/get-by-user/{id}")
    ApiResponse<AboutResponse> getByUserId(@PathVariable("id") String userId){
        return ApiResponse.<AboutResponse>builder()
                .result(aboutService.getByUserId(userId))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<?> deleteById(@PathVariable("id") String id){

        aboutService.delete(id);

        return ApiResponse.builder().build();
    }

    @PutMapping("/{id}")
    ApiResponse<AboutResponse> updateAbout(@PathVariable("id") String id, @RequestBody AboutUpdateRequest request){
        return ApiResponse.<AboutResponse>builder()
               .result(aboutService.updateById(id, request))
               .build();
    }
}
