package vn.ths.SocialNetwork.config;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.services.implement.authentication.AuthenticationServiceIpm;

import java.io.IOException;
import java.text.ParseException;

@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    CustomUserDetailsService customUserDetailsService;
    AuthenticationServiceIpm authenticationServiceIpm;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        System.out.println("token: " + token);
        try {
            if (token != null && token.startsWith("Bearer ")) {

                token = token.substring(7);

                if (authenticationServiceIpm.introspect(IntrospectRequest.builder().token(token).build()).isValid()) {

                    SignedJWT signedJWT = authenticationServiceIpm.verifyToken(token, false);
                    String username = signedJWT.getJWTClaimsSet().getSubject();

                    // Load UserDetails từ database hoặc cache
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                    // Tạo đối tượng Authentication
                    Authentication authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    // Gắn Authentication vào SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Authentication: " + authentication.toString());
                }
            }
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
        filterChain.doFilter(request, response);
    }
}
