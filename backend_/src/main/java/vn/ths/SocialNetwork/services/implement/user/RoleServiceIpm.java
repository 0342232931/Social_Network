package vn.ths.SocialNetwork.services.implement.user;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.user.RoleCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RoleUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.RoleResponse;
import vn.ths.SocialNetwork.entity.user.Permission;
import vn.ths.SocialNetwork.entity.user.Role;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.RoleMapper;
import vn.ths.SocialNetwork.repository.user.PermissionRepository;
import vn.ths.SocialNetwork.repository.user.RoleRepository;
import vn.ths.SocialNetwork.services.service.user.RoleService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceIpm implements RoleService {

    PermissionRepository permissionRepository;
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    @Override
    public RoleResponse create(RoleCreationRequest request) {

        if(roleRepository.existsById(request.getName()))
            throw new AppException(ErrorCode.ROLE_EXISTED);

        Role role = roleMapper.toRole(request);

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        return roleMapper.toRoleResponse(roleRepository.saveAndFlush(role));
    }

    @Override
    public Set<Role> getAll() {
        return new HashSet<>(roleRepository.findAll());
    }

    @Override
    public RoleResponse getById(String id) {

        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));

        return roleMapper.toRoleResponse(role);
    }

    @Transactional
    @Override
    public RoleResponse updateById(String id, RoleUpdateRequest request) {

        Role role = roleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));

        roleMapper.updateRole(role,request);

        List<Permission> permissions = permissionRepository.findAllById(request.getPermissions());

        role.setPermissions(new HashSet<>(permissions));

        return roleMapper.toRoleResponse(roleRepository.saveAndFlush(role));
    }

    @Override
    public void deleteById(String id) {

        if(!roleRepository.existsById(id))
            throw new AppException(ErrorCode.ROLE_NOT_EXISTED);

        roleRepository.deleteById(id);
    }
}
