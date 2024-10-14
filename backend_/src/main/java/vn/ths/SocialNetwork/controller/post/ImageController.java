package vn.ths.SocialNetwork.controller.post;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    DataSource dataSource;

    @PostMapping()
    ApiResponse<List<ImageResponse>> create(@RequestParam("postId") String postId,
                                            @RequestParam("image")MultipartFile[] images) throws Exception {

        List<ImageResponse> list = new ArrayList<>();

        ImageRequest request = new ImageRequest();

        request.setPostId(postId);

        for (MultipartFile file : images){
            try{
                byte[] imageBytes = file.getBytes();
                Connection connection = dataSource.getConnection();
                Blob image = connection.createBlob();
                image.setBytes(1,imageBytes);

                request.setImage(image);
                list.add(imageService.create(request));

            }catch (Exception e){
                throw new Exception(e.getMessage());
            }
        }
        return ApiResponse.<List<ImageResponse>>builder()
                .result(list)
                .build();
    }

    @GetMapping("/{id}")
    ResponseEntity<byte[]> getImageById(@PathVariable("id") String id) throws SQLException {

        ImageResponse imageResponse = imageService.findById(id);

        byte[] imageBytes = imageResponse.getImage().getBytes(1, (int)imageResponse.getImage().length());

        return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
    }

    @GetMapping("/get-images-post/{id}")
    public ResponseEntity<List<String>> returnImage(@PathVariable("id") String postId) throws SQLException {

        List<Image> images = imageService.getByPostId(postId);
        if (images == null)
            throw new AppException(ErrorCode.IMAGE_NOT_EXISTED);

        List<String> imageList = new ArrayList<>();
        for(Image image : images){

            byte[] imageData = image.getImage().getBytes(1, (int)image.getImage().length());

            // convert to base64
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            imageList.add(base64Image);
        }

        return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(imageList);
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteImage(@PathVariable("id") String id) throws Exception {

        imageService.deleteById(id);

        return ApiResponse.<Void>builder()
                .build();
    }
}
