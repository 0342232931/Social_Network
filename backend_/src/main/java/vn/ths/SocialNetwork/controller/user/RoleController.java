package vn.ths.SocialNetwork.controller.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.user.RoleCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RoleUpdateRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.user.RoleResponse;
import vn.ths.SocialNetwork.entity.user.Role;
import vn.ths.SocialNetwork.services.service.user.RoleService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/roles")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class RoleController {

    RoleService roleService;

    @PostMapping()
    public ApiResponse<RoleResponse> createPermissions(@RequestBody RoleCreationRequest request){
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping()
    public ApiResponse<Set<Role>> getAllRoles() {
        return ApiResponse.<Set<Role>>builder()
                .result(roleService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<RoleResponse> getRole(@PathVariable("id") String id) {

        return ApiResponse.<RoleResponse>builder()
                .result(roleService.getById(id))
               .build();
    }

    @PutMapping("/{id}")
    ApiResponse<RoleResponse> updateRole(@PathVariable("id") String id, @RequestBody RoleUpdateRequest request){

        return ApiResponse.<RoleResponse>builder()
                .result(roleService.updateById(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteRoleById(@PathVariable("id") String id) {
        roleService.deleteById(id);
        return ApiResponse.builder()
                .result("Delete Success!")
                .build();
    }
}
