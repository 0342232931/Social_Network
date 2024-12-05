package vn.ths.SocialNetwork.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    INVALID_KEY(1001,"Invalid message key", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1003, "User not existed", HttpStatus.NOT_FOUND),
    EMAIL_EXISTED(1004,"Email existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(2001, "User name must be at least {min} character", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(2002, "Password must be at least {min} character", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(2003, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    ACCESS_DENIED(2004, "You haven't access", HttpStatus.FORBIDDEN),
    COMMENT_NOT_EXISTED(3001,"Comment not existed", HttpStatus.NOT_FOUND),
    INTERACTION_NOT_EXISTED(4001,"Interaction not existed", HttpStatus.NOT_FOUND),
    INTERACTION_EXISTED(4002,"Interaction existed", HttpStatus.BAD_REQUEST),
    INTERACT_NOT_EXISTED(5001,"Interact not existed", HttpStatus.NOT_FOUND),
    INTERACT_EXISTED(5002,"Interact existed", HttpStatus.BAD_REQUEST),
    POST_NOT_EXISTED(6001,"Post not existed", HttpStatus.NOT_FOUND),
    IMAGE_NOT_EXISTED(7001,"Image not existed", HttpStatus.NOT_FOUND),
    ABOUT_NOT_EXISTED(7001,"About not existed", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_EXISTED(8001,"Permission not existed", HttpStatus.NOT_FOUND),
    PERMISSION_EXISTED(8002,"Permission existed", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(9001,"Role not existed", HttpStatus.NOT_FOUND),
    ROLE_EXISTED(9002,"Role existed", HttpStatus.BAD_REQUEST),
    RELATION_NOT_EXISTED(1101,"Relation not existed", HttpStatus.NOT_FOUND),
    AVATAR_NOT_EXISTED(1201,"Avatar not existed", HttpStatus.NOT_FOUND),
    CAN_NOT_SEND_MESSAGE(1301, "Can't send message to you", HttpStatus.BAD_REQUEST),
    CAN_NOT_SEND_NOTIFICATION(1302, "Can't send notification to you", HttpStatus.BAD_REQUEST),
    NOTIFICATION_NOT_EXISTS(1303, "Can't find notification", HttpStatus.NOT_FOUND),
    TOKEN_IS_NULL(1303, "token is null", HttpStatus.BAD_REQUEST),
    TOKEN_NOT_VALID(1304, "token is not valid", HttpStatus.BAD_REQUEST),
;
    private int code;
    private String message;
    private HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
