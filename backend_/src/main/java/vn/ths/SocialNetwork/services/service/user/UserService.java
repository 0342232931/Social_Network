package vn.ths.SocialNetwork.services.service.user;

import vn.ths.SocialNetwork.dto.request.websocket.GetUsersRequest;
import vn.ths.SocialNetwork.dto.request.user.UserCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.UserUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

public interface UserService {
    public UserResponse create(UserCreationRequest request);
    public UserResponse findById(String id);
    public UserResponse updateById(String id, UserUpdateRequest request);
    public List<User> getAll();
    public UserResponse getMyInfo();
    public void deleteById(String id);
    public List<UserResponse> searchUsersByKeyword(String keyword);
    public UserResponse findByUsername(String username);
}