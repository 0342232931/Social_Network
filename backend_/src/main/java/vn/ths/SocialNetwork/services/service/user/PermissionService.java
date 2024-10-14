package vn.ths.SocialNetwork.services.service.user;

import vn.ths.SocialNetwork.dto.request.user.PermissionRequest;
import vn.ths.SocialNetwork.dto.response.user.PermissionResponse;
import vn.ths.SocialNetwork.entity.user.Permission;

import java.util.List;

public interface PermissionService {
    public PermissionResponse create(PermissionRequest request);
    public List<Permission> getAll();
    public void deleteById(String id);
}
