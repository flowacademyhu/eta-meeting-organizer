package hu.flowacademy.meetingorganizer.config.security;

import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  @NonNull
  private final UserRepository userRepository;

  // This method is never used
  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
  }

  @Transactional(readOnly = true)
  public UserDetails loadUserById(String id) {
    return userRepository.findById(id).orElseThrow();
  }
}
