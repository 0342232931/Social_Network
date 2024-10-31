package vn.ths.SocialNetwork.config;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.ths.SocialNetwork.dto.request.user.RoleCreationRequest;
import vn.ths.SocialNetwork.entity.user.Role;
import vn.ths.SocialNetwork.entity.user.User;
import vn.ths.SocialNetwork.mapper.user.RoleMapper;
import vn.ths.SocialNetwork.repository.user.RoleRepository;
import vn.ths.SocialNetwork.repository.user.UserRepository;
import vn.ths.SocialNetwork.services.service.user.RoleService;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    RoleService roleService;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User user = User.builder()
                        .password(passwordEncoder.encode("123456789"))
                        .username("admin")
                        .roles(roleService.getAll())
                        .build();

                userRepository.saveAndFlush(user);
                log.warn("admin user has been created with default password: change it, please change it ");
            }
        };
    }
}

