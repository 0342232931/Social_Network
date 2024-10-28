package vn.ths.SocialNetwork.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.ths.SocialNetwork.dto.request.user.UserCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.UserUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.entity.user.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreationRequest userCreationRequest);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
