package vn.ths.SocialNetwork.config;

import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.services.implement.authentication.AuthenticationServiceIpm;

import java.text.ParseException;

@Component
public class AuthChannelInterceptorAdapter implements ChannelInterceptor {

    @Autowired
    AuthenticationServiceIpm authenticationServiceIpm;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // Get token in attributes of session
        String token = (String) accessor.getSessionAttributes().get("Authorization");

        if (token != null){
            try {
                boolean isValid = authenticationServiceIpm.introspect(IntrospectRequest.builder()
                                .token(token)
                                .build()).isValid();
                if (isValid){
                    return message;
                }
                throw new AppException(ErrorCode.TOKEN_NOT_VALID);
            } catch (JOSEException | ParseException e) {
                throw new RuntimeException(e);
            }
        }
        throw new AppException(ErrorCode.TOKEN_IS_NULL);
    }
}
