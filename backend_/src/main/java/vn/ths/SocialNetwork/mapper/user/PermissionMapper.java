package vn.ths.SocialNetwork.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.user.PermissionRequest;
import vn.ths.SocialNetwork.dto.response.user.PermissionResponse;
import vn.ths.SocialNetwork.entity.user.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {

    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
