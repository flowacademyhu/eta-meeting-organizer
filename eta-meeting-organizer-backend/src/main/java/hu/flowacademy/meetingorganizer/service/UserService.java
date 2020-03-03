package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.email.EmailType;
import hu.flowacademy.meetingorganizer.persistence.model.Role;
import hu.flowacademy.meetingorganizer.exception.UserNotFoundException;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.model.dto.RoleDTO;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

  private UserRepository userRepository;
  private EmailService emailService;

  public List<User> findAll() {
    return userRepository.findAllByOrderById();
  }

  public Optional<User> findOne(String id) {
    return Optional.of(userRepository.findById(id))
        .orElseThrow(() -> new UserNotFoundException(id));
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  public User updateUser(String id, User user) {
    userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    user.setId(id);
    return userRepository.save(user);
  }

  public User setUserRole(String id, RoleDTO roleDTO) {
    User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    if (user.getRole() == Role.PENDING) {
      emailService.send(user.getUsername(), "welcome", EmailType.TEXT);
    }
    user.setRole(roleDTO.getRole());
    return userRepository.save(user);
  }
}
