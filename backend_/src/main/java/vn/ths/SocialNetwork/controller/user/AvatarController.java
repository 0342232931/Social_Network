package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.dto.request.user.AvatarCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AvatarUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;
import vn.ths.SocialNetwork.services.service.user.AvatarService;

import javax.sql.DataSource;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AvatarController {

    AvatarService avatarService;
    DataSource dataSource;

    @PostMapping()
    ApiResponse<AvatarResponse> createAvatar(@RequestParam("userId") String userId,
                                             @RequestParam("avatar")MultipartFile avatar) throws Exception {

        AvatarCreationRequest request = new AvatarCreationRequest();

        request.setUserId(userId);

        try{
                byte[] imageBytes = avatar.getBytes();
                Connection connection = dataSource.getConnection();
                Blob image = connection.createBlob();
                image.setBytes(1,imageBytes);

                request.setAvatar(image);
            }catch (Exception e){
                throw new Exception(e.getMessage());
        }

        return ApiResponse.<AvatarResponse>builder()
                .result(avatarService.create(request))
                .build();
    }

    @PutMapping("/update-by-user-id/{id}")
    ApiResponse<AvatarResponse> updateAvatar(@PathVariable("id") String userId,
                                             @RequestParam("avatar") MultipartFile avatar) throws Exception {
        AvatarUpdateRequest request = new AvatarUpdateRequest();

        try{
            byte[] imageBytes = avatar.getBytes();
            Connection connection = dataSource.getConnection();
            Blob image = connection.createBlob();
            image.setBytes(1,imageBytes);

            request.setAvatar(image);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }

        return ApiResponse.<AvatarResponse>builder()
                .result(avatarService.updateByUserId(userId,request))
                .build();
    }

    @GetMapping("/get-by-user-id/{id}")
    ResponseEntity<byte[]> uploadImage(@PathVariable("id") String userId) throws SQLException {

        AvatarResponse avatarResponse = avatarService.getByUserId(userId);

        if(avatarResponse == null || avatarResponse.getAvatar() == null){
            return ResponseEntity.notFound().build();
        }

        byte[] imageBytes = avatarResponse.getAvatar().getBytes(1, (int)avatarResponse.getAvatar().length());

        return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
    }

    @DeleteMapping("/delete-by-user-id/{id}")
    ApiResponse<?> deleteAvatarByUserId(@PathVariable("id") String userId) {
        avatarService.deleteByUserId(userId);
        return ApiResponse.builder()
               .result("Delete Success!")
               .build();
    }

}
