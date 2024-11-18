package vn.ths.SocialNetwork.mapper.post;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.ths.SocialNetwork.dto.request.post.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.post.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.post.CommentResponse;
import vn.ths.SocialNetwork.entity.post.Comment;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "post", ignore = true)
    Comment toComment(CommentCreationRequest request);

    CommentResponse toCommentResponse(Comment comment);

    void updateComment(@MappingTarget Comment comment, CommentUpdateRequest request);

}
