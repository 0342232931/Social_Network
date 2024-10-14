package vn.ths.SocialNetwork.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.ths.SocialNetwork.dto.request.user.AboutCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.AboutUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.AboutResponse;
import vn.ths.SocialNetwork.entity.user.About;

@Mapper(componentModel = "spring")
public interface AboutMapper {

    @Mapping(target = "user", ignore = true)
    About toAbout(AboutCreationRequest request);

    AboutResponse toAboutResponse(About about);

    void updateAbout(@MappingTarget About about, AboutUpdateRequest request);

}
