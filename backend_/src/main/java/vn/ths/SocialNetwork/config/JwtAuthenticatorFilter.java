//package vn.ths.SocialNetwork.config;
//
//import com.nimbusds.jose.JOSEException;
//import com.nimbusds.jwt.SignedJWT;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
//import vn.ths.SocialNetwork.exception.AppException;
//import vn.ths.SocialNetwork.exception.ErrorCode;
//import vn.ths.SocialNetwork.services.implement.authentication.AuthenticationServiceIpm;
//
//import java.io.IOException;
//import java.text.ParseException;
//
//@Component
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//@RequiredArgsConstructor
//public class JwtAuthenticatorFilter extends OncePerRequestFilter {
//
//    CustomUserDetailsService customUserDetailsService;
//    AuthenticationServiceIpm authenticationServiceIpm;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String token = request.getHeader("Authorization");
//
//        if (token == null)
//            throw new AppException(ErrorCode.TOKEN_IS_NULL);
//
//        token = token.substring(7);
//
//        try {
//            boolean isValid = authenticationServiceIpm.introspect(
//                    IntrospectRequest.builder().token(token).build()).isValid();
//
//            if (!isValid)
//                throw new AppException(ErrorCode.TOKEN_NOT_VALID);
//
//            SignedJWT signedJWT = authenticationServiceIpm.verifyToken(token, false);
//            String username = signedJWT.getJWTClaimsSet().getSubject();
//
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken
//                    (userDetails, null, userDetails.getAuthorities());
//
//            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        } catch (JOSEException | ParseException e) {
//            throw new RuntimeException(e);
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}
