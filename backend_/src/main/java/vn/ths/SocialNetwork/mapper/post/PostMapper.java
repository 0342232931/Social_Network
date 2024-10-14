package vn.ths.SocialNetwork.mapper.post;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.ths.SocialNetwork.dto.request.post.PostCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.PostUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.PostResponse;
import vn.ths.SocialNetwork.entity.post.Post;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(target = "user", ignore = true)
    Post toPost(PostCreationRequest request);

    PostResponse toPostResponse(Post post);

    void updatePost(@MappingTarget Post post, PostUpdateRequest request);

}
