package vn.ths.SocialNetwork.services.implement.authentication;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.*;
import org.springframework.util.CollectionUtils;
import vn.ths.SocialNetwork.dto.request.authentication.AuthenticationRequest;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.dto.request.authentication.LogoutRequest;
import vn.ths.SocialNetwork.dto.request.authentication.RefreshRequest;
import vn.ths.SocialNetwork.dto.response.authentication.AuthenticationResponse;
import vn.ths.SocialNetwork.dto.response.authentication.IntrospectResponse;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.entity.InvalidatedToken;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.UserMapper;
import vn.ths.SocialNetwork.repository.user.InvalidatedTokenRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.athentication.AuthenticationService;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceIpm implements AuthenticationService {

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    UserRepository userRepository;
    UserMapper userMapper;
    InvalidatedTokenRepository invalidatedTokenRepository;

    PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception {

        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        var authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(user);

        UserResponse userResponse = getUserByToken(token);

        return AuthenticationResponse.builder()
                .token(token)
                .isAuthenticated(true)
                .userResponse(userResponse)
                .build();
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {

        var token = request.getToken();

        boolean isValid = true;
        try {

            verifyToken(token, false);
        } catch (AppException e){
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    @Override
    public void Logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true);

            var jti = signToken.getJWTClaimsSet().getJWTID();

            var expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jti)
                    .expiryTime(expiryTime)
                    .build();

            invalidatedTokenRepository.saveAndFlush(invalidatedToken);
        } catch (AppException e) {
            log.info("Token already expired ");
        }

    }

    @Override
    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {

        var signedJWT = verifyToken(request.getToken(), true);

        var jti = signedJWT.getJWTClaimsSet().getJWTID();

        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jti)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.saveAndFlush(invalidatedToken);

        var username = signedJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .isAuthenticated(true)
                .token(token)
                .userResponse(userMapper.toUserResponse(user))
                .build();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        // Kiểm tra thời gian hết hạn của token
        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant()
                        .plus(REFRESHABLE_DURATION,ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        // Kiểm tra token có hợp lệ không
        var verified = signedJWT.verify(verifier);

        if (!(expiryTime.after(new Date()) && verified))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    public UserResponse getUserByToken(String token) throws ParseException, JOSEException {

        var signedJWT = verifyToken(token, false);

        var username = signedJWT.getJWTClaimsSet().getSubject();

        System.out.println("username: " + username);
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        System.out.println("user: " + user.toString());
        return userMapper.toUserResponse(user);
    }

    private String generateToken(User user) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("sondev.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.info("Cannot generate Token: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user){

        StringJoiner joiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(s -> {
                joiner.add("ROLE_" + s.getName());
                if (!CollectionUtils.isEmpty(s.getPermissions()))
                    s.getPermissions().forEach(p -> joiner.add(p.getName()));
            });

        return joiner.toString();
    }

}
