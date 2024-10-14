package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.user.PermissionRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.PermissionResponse;
import vn.ths.SocialNetwork.entity.user.Permission;
import vn.ths.SocialNetwork.services.service.user.PermissionService;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PermissionController {

    PermissionService permissionService;

    @PostMapping()
    public ApiResponse<PermissionResponse> createPermissions(@RequestBody PermissionRequest request){
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.create(request))
                .build();
    }

    @GetMapping()
    public ApiResponse<List<Permission>> getAllPermissions() {
        return ApiResponse.<List<Permission>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deletePermissionById(@PathVariable("id") String id) {
        permissionService.deleteById(id);
        return ApiResponse.builder()
                .result("Delete Success!")
                .build();
    }
}
