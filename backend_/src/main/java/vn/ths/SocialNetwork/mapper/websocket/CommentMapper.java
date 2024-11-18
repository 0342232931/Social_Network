package vn.ths.SocialNetwork.mapper.websocket;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.ths.SocialNetwork.dto.request.websocket.CommentCreationRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CommentUpdateRequest;
import vn.ths.SocialNetwork.dto.response.websocket.CommentResponse;
import vn.ths.SocialNetwork.entity.websocket.Comment;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "post", ignore = true)
    Comment toComment(CommentCreationRequest request);

    CommentResponse toCommentResponse(Comment comment);

    void updateComment(@MappingTarget Comment comment, CommentUpdateRequest request);

}
