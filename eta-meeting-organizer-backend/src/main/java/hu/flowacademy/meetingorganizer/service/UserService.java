package hu.flowacademy.meetingorganizer.service;

import hu.flowacademy.meetingorganizer.persistence.model.UserPrincipal;
import hu.flowacademy.meetingorganizer.persistence.repository.UserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<UserPrincipal> findAll() {
    return userRepository.findAll();
  }

  public Optional<UserPrincipal> findOne(String id) {
    return userRepository.findById(id);
  }

  public UserPrincipal createUser(UserPrincipal userPrincipal) {
    return userRepository.save(userPrincipal);
  }

  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  public UserPrincipal updateUser(String id, UserPrincipal userPrincipal) {
    userPrincipal.setId(id);
    return userRepository.save(userPrincipal);
  }
}
