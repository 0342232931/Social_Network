package vn.ths.SocialNetwork.services.service.chat;

import vn.ths.SocialNetwork.dto.request.chat.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.chat.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.chat.MessageResponse;

import java.util.List;

public interface MessageService {
    public List<MessageResponse> getMessagesBySenderAndReceiver(AllMessageRequest request);
    public MessageResponse save(MessageCreationRequest request);
    public void deleteById(String messageId);
}
