package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.User;
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

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public Optional<User> findOne(Long id) {
    return userRepository.findById(id);
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public User updateUser(Long id, User user) {
    user.setId(id);
    return userRepository.save(user);
  }
}
