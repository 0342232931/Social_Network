package vn.ths.SocialNetwork.services.service.user;

import vn.ths.SocialNetwork.dto.request.user.RelationAddFriendRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationDeleteFriendRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CheckIsFriendRequest;
import vn.ths.SocialNetwork.dto.response.user.RelationResponse;
import vn.ths.SocialNetwork.dto.response.websocket.AddFriendResponse;
import vn.ths.SocialNetwork.dto.response.websocket.CheckIsFriendResponse;
import vn.ths.SocialNetwork.entity.user.Relation;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

public interface RelationService {
    public RelationResponse getById(String id);
    public List<User> getFriendsByUserId(String userId);
    public List<Relation> getAll();
    public Relation create(RelationCreationRequest request);
    public AddFriendResponse addFriend(RelationAddFriendRequest request);
    public RelationResponse deleteFriend(String userId, RelationDeleteFriendRequest request);
    public void deleteRelationById(String relationId);
    public CheckIsFriendResponse checkIsFriend(CheckIsFriendRequest request);
}
