package vn.ths.SocialNetwork.services.service.athentication;

import com.nimbusds.jose.JOSEException;
import vn.ths.SocialNetwork.dto.request.authentication.AuthenticationRequest;
import vn.ths.SocialNetwork.dto.request.authentication.IntrospectRequest;
import vn.ths.SocialNetwork.dto.request.authentication.LogoutRequest;
import vn.ths.SocialNetwork.dto.request.authentication.RefreshRequest;
import vn.ths.SocialNetwork.dto.response.authentication.AuthenticationResponse;
import vn.ths.SocialNetwork.dto.response.authentication.IntrospectResponse;

import java.text.ParseException;

public interface AuthenticationService {
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception;
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;
    public void Logout(LogoutRequest request) throws ParseException, JOSEException;
    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
}
