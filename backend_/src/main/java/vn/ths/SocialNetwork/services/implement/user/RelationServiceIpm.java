package vn.ths.SocialNetwork.services.implement.user;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.user.RelationAddFriendRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.RelationDeleteFriendRequest;
import vn.ths.SocialNetwork.dto.request.websocket.CheckIsFriendRequest;
import vn.ths.SocialNetwork.dto.response.user.RelationResponse;
import vn.ths.SocialNetwork.dto.response.websocket.AddFriendResponse;
import vn.ths.SocialNetwork.dto.response.websocket.CheckIsFriendResponse;
import vn.ths.SocialNetwork.entity.user.Relation;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.entity.websocket.Notification;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.RelationMapper;
import vn.ths.SocialNetwork.repository.user.RelationRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.repository.websocket.NotificationRepository;
import vn.ths.SocialNetwork.services.service.user.RelationService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RelationServiceIpm implements RelationService {

    UserRepository userRepository;
    RelationRepository relationRepository;
    RelationMapper relationMapper;
    NotificationRepository notificationRepository;

    @Override
    public RelationResponse getById(String id) {

        Relation relation = relationRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RELATION_NOT_EXISTED));

        return relationMapper.toRelationResponse(relation);
    }

    @Override
    public List<User> getFriendsByUserId(String userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Relation relation = relationRepository.getByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.RELATION_NOT_EXISTED));

        return relation.getFriends();
    }

    @Override
    public List<Relation> getAll() {
        return relationRepository.findAll();
    }

    @Transactional
    @Override
    public Relation create(RelationCreationRequest request) {

        Relation relation = new Relation();

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<User> friends = userRepository.findAllById(request.getFriendIds());

        relation.setFriends(friends);
        relation.setUser(user);

        return relationRepository.saveAndFlush(relation);
    }

    @Transactional
    @Override
    public AddFriendResponse addFriend(RelationAddFriendRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Relation relation = relationRepository.getRelationByUserId(request.getUserId());

        if (relation == null){

            List<String> friendsRq = List.of(request.getFriendId());
            RelationCreationRequest creationRequest = new RelationCreationRequest(request.getUserId(), friendsRq);

            Relation relationTemp = create(creationRequest);

            return AddFriendResponse.builder()
                    .user1(user)
                    .user2(relationTemp.getFriends().getFirst())
                    .build();
        }

        User friend = userRepository.findById(request.getFriendId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<User> friends = relation.getFriends();

        if (!friends.contains(friend)) {
            friends.add(friend);
        } else {
            throw new RuntimeException("Friend existed");
        }

        relation.setFriends(friends);

        Relation result =  relationRepository.saveAndFlush(relation);

        return AddFriendResponse.builder()
                    .user2(friend)
                    .user1(user)
                    .build();
    }

    @Transactional
    @Override
    public RelationResponse deleteFriend(String userId, RelationDeleteFriendRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        User friend = userRepository.findById(request.getFriendId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Relation relation = relationRepository.getByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.RELATION_NOT_EXISTED));

        List<User> friends = relation.getFriends();

        if (friends.contains(friend))
            friends.remove(friend);
        else
            throw new RuntimeException("Friend Not existed");

        relation.setFriends(friends);

        return relationMapper.toRelationResponse(relationRepository.saveAndFlush(relation));
    }

    @Transactional
    @Override
    public void deleteRelationById(String relationId) {

        relationRepository.findById(relationId).orElseThrow(() -> new AppException(ErrorCode.RELATION_NOT_EXISTED));

        relationRepository.deleteById(relationId);
    }

    @Override
    public CheckIsFriendResponse checkIsFriend(CheckIsFriendRequest request) {

        CheckIsFriendResponse response = new CheckIsFriendResponse("false", "false", "false");

        Relation relation = relationRepository.getRelationByUserId(request.getUserId());
        if (relation != null) {
            List<User> friends = getFriendsByUserId(request.getUserId());

            for (User friend : friends) {
                if (friend.getId().equals(request.getFriendId())) {
                    response.setIsFriend("true");
                    return response;
                }
            }
        }

        Notification notification = notificationRepository.checkIsSendNotificationAddFriend("ADD_FRIEND",
                request.getUserId(), request.getFriendId());
        if ( notification != null) {
            response.setIsSendNotificationAddFriend("true");
            return response;
        }

        Notification notification2 = notificationRepository.checkIsSendNotificationAddFriend("ADD_FRIEND",
                request.getFriendId(), request.getUserId());

        if (notification2 != null) {
            response.setIsReceivedNotificationAddFriend("true");
            return response;
        }

        return response;
    }
}
