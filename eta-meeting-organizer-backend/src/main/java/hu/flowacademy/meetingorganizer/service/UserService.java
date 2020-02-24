package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.email.EmailService;
import hu.flowacademy.meetingorganizer.email.EmailType;
import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

  private UserRepository userRepository;
  private EmailService emailService;

  public List<User> findAll(Integer pageNumber, Integer pageSize) {
    return userRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
  }

  public Optional<User> findOne(String id) {
    return userRepository.findById(id);
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  public User updateUser(String id, User user) {
    userRepository.findById(id).orElseThrow();
    user.setVerifiedByAdmin(true);
    emailService.send(user.getUsername(), "validation", EmailType.TEXT);
    return userRepository.save(user);
  }
}
