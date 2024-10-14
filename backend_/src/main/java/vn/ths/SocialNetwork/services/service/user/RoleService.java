package vn.ths.SocialNetwork.services.service.user;

import vn.ths.SocialNetwork.dto.request.user.RoleCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RoleUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.RoleResponse;
import vn.ths.SocialNetwork.entity.user.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    public RoleResponse create(RoleCreationRequest request);
    public Set<Role> getAll();
    public RoleResponse getById(String id);
    public RoleResponse updateById(String id, RoleUpdateRequest request);
    public void deleteById(String id);
}
