package vn.ths.SocialNetwork.config;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.services.implement.authentication.AuthenticationServiceIpm;

import java.util.Map;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class WebsocketAuthenticator implements HandshakeInterceptor {

    AuthenticationServiceIpm authenticationServiceIpm;
    CustomUserDetailsService customUserDetailsService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {

        String authHeader = request.getURI().getQuery();

        if (authHeader != null && authHeader.startsWith("token=")){

            String token = authHeader.substring(6);

            boolean isValid =  authenticationServiceIpm.introspect(IntrospectRequest.builder()
                            .token(token)
                            .build()).isValid();

            if (isValid) {
                attributes.put("Authorization", token);
            }
            return isValid;
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                               Exception exception) {

    }
}
