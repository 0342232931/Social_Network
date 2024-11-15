package vn.ths.SocialNetwork.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import vn.ths.SocialNetwork.services.implement.authentication.AuthenticationServiceIpm;

import java.text.ParseException;
import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    AuthenticationServiceIpm authenticationService;
    CustomUserDetailsService customUserDetailsService;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // Đặt prefix /app cho các destination để phân biệt với các destination mà broker xử lý.
        // Những message có đích bắt đầu bằng /app thì sẽ chuyển tiếp đến các controller
        registry.setApplicationDestinationPrefixes("/app");

        // Kích hoạt broker nội bộ với các destination prefix /topic, /queue, /user
        // Các client sẽ đăng ký vào những chủ đề naày để nhận thông báo từ controller
        registry.enableSimpleBroker("/topic", "/queue", "user");

        // Đặt prefix /user cho các message gửi đến từng user cụ thể ( user-specific )
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("ws") // Thiết lập endpoint Websocket tại đường dẫn /ws, nơi client sẽ kết nối
                .setAllowedOriginPatterns("http://localhost:3000") // Chỉ định nguồn gốc cho phép kêt nối Websocket
                .withSockJS();
    }

    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {

        // Thiết lập JSON làm Mime Type mặc định cho các message
        DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();
        resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);

        // Dùng Jackson cho việc chuyển đổi giữa JSON và các đối tượng trong java
        MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
        converter.setObjectMapper(new ObjectMapper());
        converter.setContentTypeResolver(resolver);

        // Thêm converter vào danh sách message converter của ứng dụng
        messageConverters.add(converter);

        // Chỉ định không sử dụng converter mặc định, chỉ sử dụng converter được cấu hình trong function này
        return false;
    }

    // Kiểm tra JWT token của client và xác thực người dùng
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {

            // Được gọi trước khi message được gửi vào channel
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                assert accessor != null;

                // Chỉ áp dụng cho message loại connect (client đã kết nối)
                if (StompCommand.CONNECT.equals(accessor.getCommand())){

                    // Lấy JWT từ header Authorization của message, loại bỏ tiền tố "Bearer"
                    String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
                    assert authorizationHeader != null;
                    String token = authorizationHeader.substring(7);

                    try {

                        // Giải mã jwt lấy username của người dùng
                        String username = authenticationService.getUserByToken(token).getUsername();
                        assert username != null;
                        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                        //Tạo đối tượng chứng thực cho người dùng, bao gồm cả quyền hạn của họ
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new
                                UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                        // Đặt chứng thực vào context bảo mật của spring
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                        // Đặt người dùng vào header của message,
                        // Giúp spring bảo mật và gửi message dựa trên chứng thực của người dùng đó
                        accessor.setUser(usernamePasswordAuthenticationToken);

                    } catch (ParseException | JOSEException e) {
                        throw new RuntimeException(e);
                    }
                }
                return message;
            }
        });
    }

}
