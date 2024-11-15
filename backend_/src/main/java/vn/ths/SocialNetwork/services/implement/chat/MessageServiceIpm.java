package vn.ths.SocialNetwork.services.implement.chat;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.chat.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.chat.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.chat.MessageResponse;
import vn.ths.SocialNetwork.entity.chat.Message;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.chat.MessageMapper;
import vn.ths.SocialNetwork.repository.chat.MessageRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.chat.MessageService;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageServiceIpm implements MessageService {

    MessageRepository messageRepository;
    MessageMapper messageMapper;
    UserRepository userRepository;

    @Override
    public List<MessageResponse> getMessagesBySenderAndReceiver(AllMessageRequest request) {

        User sender = userRepository.findByUsername(request.getSenderUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        User receiver = userRepository.findByUsername(request.getReceiverUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        try {
            List<Message> messages = messageRepository.getBySenderAndReceiver(sender, receiver);

            List<MessageResponse> messageResponses = new ArrayList<>();

            for (Message message : messages) {

                MessageResponse response = messageMapper.toMessageResponse(message);

                response.setReceiverUsername(message.getReceiver().getUsername());
                response.setSenderUsername(message.getSender().getUsername());

                messageResponses.add(response);
            }

            return messageResponses;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public MessageResponse save(MessageCreationRequest request) {

        User sender = userRepository.findByUsername(request.getSenderUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        User receiver = userRepository.findByUsername(request.getReceiverUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        try {
            Message message = messageMapper.toMessage(request);
            message.setSender(sender);
            message.setReceiver(receiver);

            MessageResponse response = messageMapper.toMessageResponse(messageRepository.save(message));
            response.setSenderUsername(request.getSenderUsername());
            response.setReceiverUsername(request.getReceiverUsername());

            return response;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteById(String messageId) {
        messageRepository.deleteById(messageId);
    }
}