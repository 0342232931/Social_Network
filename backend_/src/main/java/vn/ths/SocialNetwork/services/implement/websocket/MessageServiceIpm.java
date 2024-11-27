package vn.ths.SocialNetwork.services.implement.websocket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.websocket.AllMessageRequest;
import vn.ths.SocialNetwork.dto.request.websocket.GetUsersRequest;
import vn.ths.SocialNetwork.dto.request.websocket.MessageCreationRequest;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.dto.response.websocket.MessageResponse;
import vn.ths.SocialNetwork.entity.websocket.Message;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.websocket.MessageMapper;
import vn.ths.SocialNetwork.mapper.user.UserMapper;
import vn.ths.SocialNetwork.repository.websocket.MessageRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.websocket.MessageService;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageServiceIpm implements MessageService {

    MessageRepository messageRepository;
    MessageMapper messageMapper;
    UserRepository userRepository;
    UserMapper userMapper;

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

                response.setSender(userMapper.toUserResponse(message.getSender()));
                response.setReceiver(userMapper.toUserResponse(message.getReceiver()));

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
            message.setId(UUID.randomUUID().toString());
            message.setCreateAt(LocalDateTime.now());
            message.setSender(sender);
            message.setReceiver(receiver);

            MessageResponse response = messageMapper.toMessageResponse(messageRepository.save(message));
            response.setSender(userMapper.toUserResponse(message.getSender()));
            response.setReceiver(userMapper.toUserResponse(message.getReceiver()));

            return response;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteById(String messageId) {
        messageRepository.deleteById(messageId);
    }

    @Override
    public List<UserResponse> getUsersHaveMessageWithUserDetailId(GetUsersRequest request) {

        List<User> receivers = messageRepository.getReceiverHaveMessageWithSenderId(request.getUserDetailId());
        List<User> senders = messageRepository.getSenderHaveMessageWithReceiverId(request.getUserDetailId());

        Set<User> users = new HashSet<>();
        users.addAll(receivers);
        users.addAll(senders);

        List<UserResponse> userResponses = new ArrayList<>();
        users.forEach(user -> {
            userResponses.add(userMapper.toUserResponse(user));
        });

        return userResponses;
    }
}
