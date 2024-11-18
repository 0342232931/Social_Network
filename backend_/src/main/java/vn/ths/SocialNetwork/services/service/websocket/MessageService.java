package vn.ths.SocialNetwork.services.service.websocket;

import vn.ths.SocialNetwork.dto.request.websocket.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.websocket.GetUsersRequest;
import vn.ths.SocialNetwork.dto.request.websocket.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.dto.response.websocket.MessageResponse;

import java.util.List;

public interface MessageService {
    public List<MessageResponse> getMessagesBySenderAndReceiver(AllMessageRequest request);
    public MessageResponse save(MessageCreationRequest request);
    public void deleteById(String messageId);
    public List<UserResponse> getUsersHaveMessageWithUserDetailId(GetUsersRequest request);
}
