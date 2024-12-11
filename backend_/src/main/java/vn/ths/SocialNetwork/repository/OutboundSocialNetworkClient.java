//package vn.ths.SocialNetwork.repository;
//
//import feign.QueryMap;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.PostMapping;
//import vn.ths.SocialNetwork.dto.request.authentication.ExchangeTokenRequest;
//import vn.ths.SocialNetwork.dto.response.authentication.ExchangeTokenResponse;
//
//@FeignClient(name = "outbound-social-network", url = "https://oauth2.googleapis.com")
//public interface OutboundSocialNetworkClient {
//    @PostMapping(value = "/token", produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
//    ExchangeTokenResponse exchangeToken(@QueryMap ExchangeTokenRequest request);
//}
