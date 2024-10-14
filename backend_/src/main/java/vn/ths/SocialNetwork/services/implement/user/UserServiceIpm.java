package vn.ths.SocialNetwork.services.implement.user;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.Service;
import vn.ths.SocialNetwork.dto.request.user.UserCreationRequest;
import vn.ths.SocialNetwork.dto.request.user.UserUpdateRequest;
import vn.ths.SocialNetwork.dto.response.user.UserResponse;
import vn.ths.SocialNetwork.entity.user.Role;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.exception.AppException;
import vn.ths.SocialNetwork.exception.ErrorCode;
import vn.ths.SocialNetwork.mapper.user.UserMapper;
import vn.ths.SocialNetwork.repository.user.RoleRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.user.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceIpm implements UserService {

    RoleRepository roleRepository;
    UserRepository userRepository;
    UserMapper userMapper;

    PasswordEncoder passwordEncoder;

    @Override
    public UserResponse create(UserCreationRequest request) {

        if (userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);

        if (userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);

        User user = userMapper.toUser(request);

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findById("USER").orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED)));
        user.setRoles(roles);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.saveAndFlush(user));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @Override
    public UserResponse findById(String id) {

        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PostAuthorize("hasAnyRole('ADMIN','USER')")
    @Override
    public UserResponse updateById(String id, UserUpdateRequest request) {
        System.out.println("request: " + request.toString() + " id: " + id);
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.saveAndFlush(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @Override
    public UserResponse getMyInfo() {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        var username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public void deleteById(String id) {
        userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userRepository.deleteById(id);
    }
}
