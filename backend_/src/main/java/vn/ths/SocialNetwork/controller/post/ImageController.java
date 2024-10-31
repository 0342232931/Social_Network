package vn.ths.SocialNetwork.controller.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.ths.SocialNetwork.config.CustomMultipartFile;
import vn.ths.SocialNetwork.dto.request.post.ImageRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.post.ImageResponse;
import vn.ths.SocialNetwork.entity.post.Image;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.services.service.post.ImageService;

import javax.sql.DataSource;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/images")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ImageController {

    ImageService imageService;

    @PostMapping("/{id}")
    ApiResponse<?> create(@PathVariable("id") String postId,
                                            @RequestBody  ImageRequest[] request) throws Exception {
        System.out.println("Already Created");

        try {
            for (ImageRequest req : request) {
                try{
                    byte[] data = Base64.getDecoder().decode(req.getData());

                    MultipartFile file = new CustomMultipartFile(req.getFileName(), req.getFileType(), data);
                    imageService.create(postId, file);
                } catch (Exception e) {
                    return ApiResponse.builder()
                            .result("Cannot save image, error: " + e.getMessage())
                            .build();
                }
            }
            return ApiResponse.builder()
                    .result("Save Images Success")
                    .build();
        } catch (Exception e){
            return ApiResponse.builder()
                    .result("Cannot save image, error: " + e.getMessage() )
                    .build();
        }

    }

    @GetMapping("/get-images-by-post-id/{id}")
    ApiResponse<List<ImageResponse>> getImagesByPostId(@PathVariable("id") String postId){

        return ApiResponse.<List<ImageResponse>>builder()
                .result(imageService.getImagesByPostId(postId))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteImage(@PathVariable("id") String id) throws Exception {

        imageService.deleteById(id);

        return ApiResponse.<Void>builder()
                .build();
    }
}
