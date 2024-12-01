package vn.ths.SocialNetwork.config;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.services.implement.authentication.AuthenticationServiceIpm;

import java.text.ParseException;
import java.util.Map;
import java.util.Objects;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthChannelInterceptorAdapter implements ChannelInterceptor {

    AuthenticationServiceIpm authenticationServiceIpm;
    CustomUserDetailsService customUserDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        assert accessor != null;

        // Get token in attributes of session
        String token = (String) Objects.requireNonNull(accessor.getSessionAttributes()).get("Authorization");
        if (token == null)
            throw new AppException(ErrorCode.TOKEN_IS_NULL);

        try {
            if (StompCommand.CONNECT.equals(accessor.getCommand())){

                boolean isValid = authenticationServiceIpm.introspect(IntrospectRequest.builder()
                        .token(token)
                        .build()).isValid();

                if (!isValid)
                    throw new AppException(ErrorCode.TOKEN_NOT_VALID);


                SignedJWT signedJWT = authenticationServiceIpm.verifyToken(token, false);
                String username = signedJWT.getJWTClaimsSet().getSubject();

                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                // Tạo đối tượng chứng thực cho người dùng, bao gồm cả quyền hạn của họ.
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken
                        (userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                // Đặt người dùng vào header của message,
                // giúp Spring bảo mật và gửi message dựa trên chứng thực của người dùng đó.
                accessor.setUser(usernamePasswordAuthenticationToken);

                }
                return message;

        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
