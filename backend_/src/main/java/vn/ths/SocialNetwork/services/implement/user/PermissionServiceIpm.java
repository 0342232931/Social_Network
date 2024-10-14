package vn.ths.SocialNetwork.services.implement.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.user.PermissionRequest;
import vn.ths.SocialNetwork.dto.response.user.PermissionResponse;
import vn.ths.SocialNetwork.entity.user.Permission;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.PermissionMapper;
import vn.ths.SocialNetwork.repository.user.PermissionRepository;
import vn.ths.SocialNetwork.services.service.user.PermissionService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionServiceIpm implements PermissionService {

    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    @Override
    public PermissionResponse create(PermissionRequest request) {

        if(permissionRepository.existsById(request.getName()))
            throw new AppException(ErrorCode.PERMISSION_EXISTED);

        Permission permission = permissionMapper.toPermission(request);

        return permissionMapper.toPermissionResponse(permissionRepository.saveAndFlush(permission));
    }

    @Override
    public List<Permission> getAll() {
        return permissionRepository.findAll();
    }

    @Override
    public void deleteById(String id) {

        permissionRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));

        permissionRepository.deleteById(id);
    }
}
