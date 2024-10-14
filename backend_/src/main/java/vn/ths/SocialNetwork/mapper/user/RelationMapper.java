package vn.ths.SocialNetwork.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.ths.SocialNetwork.dto.request.user.RelationCreationRequest;
import vn.ths.SocialNetwork.dto.response.user.RelationResponse;
import vn.ths.SocialNetwork.entity.user.Relation;

@Mapper(componentModel = "spring")
public interface RelationMapper {
    @Mapping(target = "user",ignore = true)
    @Mapping(target = "friends", ignore = true)
    Relation toRelation(RelationCreationRequest request);

    RelationResponse toRelationResponse(Relation relation);
}
