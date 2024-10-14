package vn.ths.SocialNetwork.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.user.AvatarCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AvatarUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AvatarResponse;
import vn.ths.SocialNetwork.entity.user.Avatar;

@Mapper(componentModel = "spring")
public interface AvatarMapper {

    @Mapping(target = "user", ignore = true)
    Avatar toAvatar(AvatarCreationRequest request);

    AvatarResponse toAvatarResponse(Avatar avatar);

    @Mapping(target = "user", ignore = true)
    Avatar updateAvatar(AvatarUpdateRequest request);
}
