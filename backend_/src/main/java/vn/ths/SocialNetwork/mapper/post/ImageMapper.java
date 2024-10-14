package vn.ths.SocialNetwork.mapper.post;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.post.ImageRequest;
import vn.ths.SocialNetwork.dto.response.post.ImageResponse;
import vn.ths.SocialNetwork.entity.post.Image;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    @Mapping(target = "post", ignore = true)
    Image toImage(ImageRequest request);

    ImageResponse toImageResponse(Image image);

}
