package hu.flowacademy.meetingorganizer.config.oauth2;


import hu.flowacademy.meetingorganizer.config.Yaml;
import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.persistence.model.UserPrincipal;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.stream.Collectors;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    @NonNull private final UserRepository userRepository;

    @Autowired
    Yaml yaml;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        final var oAuth2User = (DefaultOAuth2User) super.loadUser(oAuth2UserRequest);
        log.info("oAuth2User: {}", oAuth2User);
        return userRepository.findById(oAuth2User.getName()).orElseGet(() -> createUser(oAuth2User));
    }

    private UserPrincipal convert(DefaultOAuth2User oAuth2User) {
        return UserPrincipal.builder().id(oAuth2User.getName()).username(oAuth2User.getAttribute("email"))
                .enabled(true).accountNonExpired(true).accountNonLocked(true).attributes(oAuth2User.getAttributes())
                .isVerifiedByAdmin(verificationSetter(oAuth2User))
                .role(decideRole(oAuth2User))
                .authorities(oAuth2User.getAuthorities().stream().map(UserPrincipal.UserAuthority::new).collect(Collectors.toList()))
                .build();
    }

    @Transactional
    private UserPrincipal createUser(DefaultOAuth2User oAuth2User) {
        UserPrincipal user = convert(oAuth2User);
        user.setAuthorities(user.getAuthorities().stream().peek(authority -> authority.setUser(user)).collect(Collectors.toList()));
        user.setRole(decideRole(oAuth2User));
        return userRepository.save(user);
    }

    private Role decideRole(DefaultOAuth2User oAuth2User) {
        if (yaml.getAdmins().contains(oAuth2User.getAttribute("email"))) {
            return Role.ADMIN;
        } else if(yaml.getReaders().contains(oAuth2User.getAttribute("email"))) {
            return Role.READER;
        } else {
            return Role.USER;
        }
    }

    private boolean verificationSetter(DefaultOAuth2User oAuth2User) {
        if (yaml.getAdmins().contains(oAuth2User.getAttribute("email"))) {
            return true;
        } else if(yaml.getReaders().contains(oAuth2User.getAttribute("email"))) {
            return true;
        } else {
            return false;
        }
    }
}
