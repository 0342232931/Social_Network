package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.config.CustomMultipartFile;
import vn.ths.SocialNetwork.dto.request.user.AvatarCreationRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.services.service.user.AvatarService;

import java.util.Base64;

@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AvatarController {

    AvatarService avatarService;

    @PostMapping("/{id}")
    ApiResponse<?> createAvatar(@PathVariable("id") String userId,
                                             @RequestBody AvatarCreationRequest request) throws Exception {
        System.out.println("already created");

        try {
            byte [] data = Base64.getDecoder().decode(request.getData());

            MultipartFile file = new CustomMultipartFile(request.getFileName(), request.getFileType(), data);

            var result = avatarService.save(userId, file);

            boolean isActive =  (result != null);

            return ApiResponse.builder()
                    .message("Save Avatar: " + isActive)
                    .build();
        } catch (Exception e) {
            return ApiResponse.builder()
                    .message("error: " + e.getMessage())
                    .build();
        }
    }

    @GetMapping("/get-by-user-id/{id}")
    ApiResponse<AvatarResponse> getAvatarByUserId (@PathVariable("id") String userId){
        return ApiResponse.<AvatarResponse>builder()
                .result(avatarService.getByUserId(userId))
                .build();
    }

    @DeleteMapping("/delete-by-user-id/{id}")
    ApiResponse<?> deleteAvatarByUserId(@PathVariable("id") String userId) {
        avatarService.deleteByUserId(userId);
        return ApiResponse.builder()
               .result("Delete Success!")
               .build();
    }

}
