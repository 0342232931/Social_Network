package vn.ths.SocialNetwork.controller.authentication;

import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.ths.SocialNetwork.dto.request.authentication.AuthenticationRequest;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.dto.request.authentication.LogoutRequest;
import vn.ths.SocialNetwork.dto.request.authentication.RefreshRequest;
import vn.ths.SocialNetwork.dto.response.ApiResponse;
import vn.ths.SocialNetwork.dto.response.authentication.AuthenticationResponse;
import vn.ths.SocialNetwork.dto.response.authentication.IntrospectResponse;
import vn.ths.SocialNetwork.services.service.athentication.AuthenticationService;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AuthenticationController {

    AuthenticationService authenticationService;

//    @PostMapping("/outbound/authentication")
//    public ApiResponse<AuthenticationResponse> outboundAuthentication (@RequestParam("code") String code) {
//
//        return ApiResponse.<AuthenticationResponse>builder()
//                .result(authenticationService.outboundAuthenticate(code))
//                .build();
//    }

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request)
            throws Exception {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.authenticate(request))
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refreshToken(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.refreshToken(request))
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<?> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.Logout(request);
        return ApiResponse.builder()
                .build();
    }

}
