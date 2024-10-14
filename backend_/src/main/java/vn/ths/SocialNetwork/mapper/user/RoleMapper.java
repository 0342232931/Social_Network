package vn.ths.SocialNetwork.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.ths.SocialNetwork.dto.request.user.RoleCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RoleUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.RoleResponse;
import vn.ths.SocialNetwork.entity.user.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleCreationRequest request);

    RoleResponse toRoleResponse(Role role);

    @Mapping(target = "permissions", ignore = true)
    void updateRole(@MappingTarget Role role, RoleUpdateRequest request);

}
